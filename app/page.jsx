'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import NavBar from "@/components/navbar/NavBar"
import NewWorkoutModal from "@/components/newWorkoutModal/NewWorkoutModal"
import { useRouter } from 'next/navigation'

export default function Home() {
  //check if user is signed in already
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // console.log(status)
    if (status === "unauthenticated") router.push('/welcome')
   
  }, [session])

  //state to pass down to props
  const [choice, setChoice] = useState('Full Body')

  return (
    <>
      {status === "authenticated" ? (
        <> 
          <NavBar />
          <h1>Home</h1>
          <NewWorkoutModal choice={choice} setChoice={setChoice} />
        </>
      ) : null}
    </>
  )
}
