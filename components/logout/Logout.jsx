import { signOut } from 'next-auth/react'
import { Button } from 'flowbite-react'

export default function Logout() {
  return (
    <button 
    type="button" 
    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={() => signOut({callbackUrl: '/welcome'})}
    >Sign Out</button>
    // <button className="btn-dark" onClick={() => signOut({callbackUrl: '/welcome'})}>sign out</button>
  )
}