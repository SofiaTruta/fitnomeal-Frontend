'use client'
import { signIn, useSession} from 'next-auth/react'

export default function Login() {
  return (
    <button className="login-btn" onClick={() => signIn('google', {callbackUrl: '/'})}>
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Login with Google</span>
    </button>
  )
}
