'use client'
import { useState, createContext } from "react"

export const WorkoutContext = createContext({})

export default function WorkoutProvider({ children }) {
    const [finalWorkout, setFinalWorkout] = useState(null)

    return (
        <WorkoutContext.Provider value={{
            finalWorkout,
            setFinalWorkout
        }}>
            {children}
        </WorkoutContext.Provider>
    )
}