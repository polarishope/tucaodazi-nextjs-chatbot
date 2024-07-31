import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getStringFromBuffer } from './lib/utils'
import { getUser, createGoogleUser } from './app/login/actions'
import Google from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)

          if (!user) return null

          const encoder = new TextEncoder()
          const saltedPassword = encoder.encode(password + user.salt)
          const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-256',
            saltedPassword
          )
          const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

          if (hashedPassword === user.password) {
            return user
          } else {
            return null
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    ...authConfig['callbacks'],
    async signIn({ user, account, profile, email, credentials }) {
      if (user && account?.provider === 'google') {
        createGoogleUser(user.id, user.email!, user.image!)
      }
      return true
    }
  }
})
