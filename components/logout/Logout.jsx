import { signOut } from 'next-auth/react'

export default function Logout() {
  return (
    <button className="btn-dark" onClick={() => signOut({callbackUrl: '/welcome'})}>sign out</button>
  )
}