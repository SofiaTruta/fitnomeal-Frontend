'use client'

import { useEffect, useState, useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { WorkoutContext } from "@/app/contexts/workout-context"

export default function NewWorkoutModal({ choice, setChoice }) {
    const { data: session, status } = useSession()

    const router = useRouter()

    const {finalWorkout, setFinalWorkout} = useContext(WorkoutContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION

    const confirmWorkout = async () => {

        

        try {
            const response = await fetch(`${WORKOUT_DATA}/daily-workout/new`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ choice })
            })
            const result = await response.json()
            setFinalWorkout(result)
        } catch (error) {
            console.log('could not send exercise choice over to backend', error)
        }
        closeModal()
    }

    useEffect(() => {
        if (finalWorkout !== null) router.push('/daily-workout')
    }, [finalWorkout])

    return (
        <>
            <button
                onClick={isModalOpen ? closeModal : openModal}
                data-modal-target="default-modal"
                data-modal-toggle="default-modal"
                className="block text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-m px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                {isModalOpen ? "Close Modal" : "Give me a new workout"}
            </button>

            <div
                id="default-modal"
                data-modal-show=""
                tabIndex="-1"
                aria-hidden="true"
                className={`fixed inset-0 flex items-center justify-center z-50 ${isModalOpen ? "" : "hidden"} overflow-x-hidden overflow-y-auto`}>

                <div className="relative w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                What would you like to work on today?
                            </h3>
                            <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose from the following options:</label>
                                <select
                                    value={choice}
                                    onChange={(event => setChoice(event.target.value))}
                                    id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>Full Body</option>
                                    <option>Upper Body</option>
                                    <option>Lower Body</option>
                                    <option>Cardio</option>
                                </select>
                            </div>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Your workout may or may not include a little bit of cardio - your heart is a muscle too!
                            </p>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
                            <button href={""}
                                onClick={confirmWorkout} 
                                type="button"
                                className="text-white bg-purple-600 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto">Let's go!</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
