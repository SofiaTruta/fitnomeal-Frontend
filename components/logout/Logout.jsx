import { signOut } from 'next-auth/react'
import { Button } from 'flowbite-react'

export default function Logout() {
  return (
    <button 
    type="button" 
    className="btn btn-purple"
    onClick={() => signOut({callbackUrl: '/welcome'})}
    >
      Sign Out
      </button>

  )
}