'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import NavBar from "@/components/navbar/NavBar"
import NewWorkoutModal from "@/components/newWorkoutModal/NewWorkoutModal"
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState()

  //check if user is signed in already
  const { data: session, status } = useSession()
  const email = session?.user?.email

  const router = useRouter()

  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION

  useEffect(() => {
    //!Fetch for user data so we can tell if its the first time they have logged im
    //! if so router.push to the additional signup details page 
    async function userData() {
      try {
        const response = await fetch(`${WORKOUT_DATA}/users/find/${email}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          },
        });

        const result = await response.json();
        if (result.firstLoggin === 'true') router.push('/welcome/first-login')
      } catch (error) {
        console.log('user not found');
      }
    }
    userData() // Call the function to fetch user data


    if (status === "unauthenticated") router.push('/welcome')


  }, [session]);


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
