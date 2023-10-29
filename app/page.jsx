'use client'
import { useState } from "react"
import NavBar from "@/components/navbar/NavBar"
import NewWorkoutModal from "@/components/newWorkoutModal/NewWorkoutModal"

export default function Home() {
  const [muscleGroup, setMuscleGroup] = useState('Full Body')

  return (
    <>
      <NavBar />
      <h1>Home</h1>
      <NewWorkoutModal
        muscleGroup={muscleGroup}
        setMuscleGroup={setMuscleGroup}
      />
    </>

  )
}
