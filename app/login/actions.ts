'use server'

import { signIn } from '@/auth'
import { GoogleUser, User } from '@/lib/types'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { ResultCode } from '@/lib/utils'

export async function getUser(email: string) {
  const user = await kv.hgetall<User>(`user:${email}`)
  return user
}

export async function getGoogleUser(id: string) {
  const user = await kv.hgetall<GoogleUser>(`user:google:${id}`)
  return user
}

export async function createGoogleUser(
  id: string,
  email: string,
  image: string,
) {
  const existingUser = await getGoogleUser(id)

  if (existingUser) {
    return {
      type: 'error',
      resultCode: ResultCode.UserAlreadyExists
    }
  } else {
    const user = {
      id,
      email,
      image,
    }

    await kv.hmset(`user:google:${id}`, user)

    return {
      type: 'success',
      resultCode: ResultCode.UserCreated
    }
  }
}
interface Result {
  type: string
  resultCode: ResultCode
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  try {
    const email = formData.get('email')
    const password = formData.get('password')

    const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6)
      })
      .safeParse({
        email,
        password
      })

    if (parsedCredentials.success) {
      await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      return {
        type: 'success',
        resultCode: ResultCode.UserLoggedIn
      }
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.InvalidCredentials
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials
          }
        default:
          return {
            type: 'error',
            resultCode: ResultCode.UnknownError
          }
      }
    }
  }
}
