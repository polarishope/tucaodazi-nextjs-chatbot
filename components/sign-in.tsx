import { signIn } from '@/auth'
import { Button } from './ui/button'

export function SignIn() {
  return (
    <form
      className="mx-auto"
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <Button className="mx-auto" type="submit">
        Signin with Google
      </Button>
    </form>
  )
}
