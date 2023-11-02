
'use client'
import { useState, useContext, useEffect } from "react";
import { WorkoutContext } from "@/app/contexts/workout-context"
import { useSession } from "next-auth/react"
import NavBar from "@/components/navbar/NavBar";
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function WorkoutDetails() {
  const router = useRouter()
  // const { finalWorkout, setFinalWorkout } = useContext(WorkoutContext)
  // console.log('final workout details page log', finalWorkout)
  const [dailyWorkout, setDailyWorkout] = useState(null)

  const [showInstructions, setShowInstructions] = useState(false)
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const DATABASE_CONNECTION = process.env.NEXT_PUBLIC_BACKEND_CONNECTION
  const { data: session, status } = useSession()
  const userEmail = session?.user?.email



  const getDailyWorkout = async () => {
    //fetch workout details
    if (status === "authenticated") {
      console.log('userEmail', userEmail)
      try {
        const response = await fetch(`${DATABASE_CONNECTION}/daily-workout/get?userEmail=${userEmail}`)
        const result = await response.json()
        console.log(result)
        setDailyWorkout(result.exercises)

      } catch (error) {
        console.log('trouble fetching the daily workout', error)
        setDailyWorkout('no workout')
      }
    }
    console.log('userEmail', userEmail)
  }



  const handleComplete = async () => {
    try {
      const response = await fetch(`${DATABASE_CONNECTION}/workout-history/markCompleted`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userEmail
        })
      })

      if (response.ok) {
        router.push('/history')
      }

    } catch (error) {
      console.log('problem marking it as complete', error)
    }

  }

  useEffect(() => {
    async function reload() {
      await getDailyWorkout()
    }

    reload()
    
  }, [session])


  return (
    <>
      <NavBar />
      {dailyWorkout !== null ? (
        dailyWorkout !== 'no workout' ? (
          <>
            <div className="bg-light-purple flex flex-col space-y-4 justify-center items-center">
              {dailyWorkout[0].map((workout, index) => (
                <div key={index}>
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      <img className="rounded-t-lg" src={workout?.gifUrl} alt="" />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workout.name}</h4>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Target Muscles: {workout.target}</p>
                      {showInstructions ? (
                        <div>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructions: {workout.instructions}</p>
                          <ol>
                          </ol>
                        </div>
                      ) : null}
                      <a
                        href="#"
                        onClick={toggleInstructions}
                        className="btn btn-purple"
                      >
                        {showInstructions ? 'Show Less' : 'Read More'}
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-light-purple flex flex-row justify-end">
              <Link
                href="/"
                onClick={handleComplete}
                className="sticky top-0 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-8 py-3 mb-4 mr-4 dark:focus:ring-yellow-900"
              >
                Finished it!
              </Link>
            </div>
          </>
        ) : (
          <div class="flex items-center justify-center h-screen">
          <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You have not started a workout yet</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Let's go back and generate a fresh one!</p>
            <Link href="/" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Home
              <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
        </div>
        )
      ) : (
        <div>Loading your workout...</div>
      )}
    </>
  );
}
