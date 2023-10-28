'use client'
import { signIn, useSession } from 'next-auth/react'
import GoogleButton from 'react-google-button'

export default function Welcome() {
  return (
    <>
      <div>Welcome</div>
      <GoogleButton onClick={() => signIn('google')} />
    </>
  )
}
