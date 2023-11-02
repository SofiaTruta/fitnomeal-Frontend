'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import NavBar from "@/components/navbar/NavBar"
import NewWorkoutModal from "@/components/newWorkoutModal/NewWorkoutModal"
import { useRouter } from 'next/navigation'
import { useMediaQuery } from "react-responsive"

export default function Home() {

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

  //checking if mobile
  const isMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <>
      {status === "authenticated" ? (
        <>
          <NavBar />
          {isMobile ? (
            <div 
            className="mobile-content flex flex-col items-center justify-start h-screen text-center py-7"
            style={{backgroundImage: 'url(https://images.unsplash.com/photo-1591258370814-01609b341790?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="text-2xl md:text-3xl mb-4 font-bold px-2">Your Fitness Journey Starts Here</h1>
            <p className="text-xl md:text-lg mb-4 px-3">Tired of doing the same gym routine?</p>
            <p className="text-sm mb-20 ">
              Click the button, and we'll generate a random workout for you, based on what you'd like to workout today.
            </p>
            <div className="flex justify-center mt-20">
              <NewWorkoutModal choice={choice} setChoice={setChoice} />
            </div>
          </div>
          ) : (
            <div className="relative h-screen">
              <img
                src="https://images.unsplash.com/photo-1591258370814-01609b341790?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-screen w-full object-cover"
                alt="Fitness Image"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
                <div className='bg-black bg-opacity-90 rounded-lg p-8 flex flex-col justify-center items-center'>
                  <h1 className="text-2xl md:text-3xl mb-4">Your Fitness Journey Starts Here</h1>
                  <p className="text-xl md:text-lg mb-2">Tired of doing the same gym routine?</p>
                  <p className="text-sm mb-1">Click the button, and we'll generate a random workout for you, based on what you'd like to workout today.</p>
                  <p className="text-sm mb-1">If you don't know what to train, choose Full Body</p>
                  <div className="mt-4">
                    <NewWorkoutModal choice={choice} setChoice={setChoice} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}


