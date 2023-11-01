'use client'
import { useEffect, useState, useContext } from 'react';
import { WorkoutContext } from "@/app/contexts/workout-context"
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function DailyWorkoutsPage() {
  const { finalWorkout, setFinalWorkout } = useContext(WorkoutContext)

  const { data: session, status } = useSession()
  const userEmail = session?.user?.email

  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION

  const router = useRouter()

  async function handleSave() {
    router.push("daily-workout/workout-details")
    try {
      await fetch(`${WORKOUT_DATA}/daily-workout/newWorkout`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userEmail,
          exercises: finalWorkout,
        })
      })
    } catch (error) {
      console.log('could not send exercise choice over to backend', error)
    }
  }

  function handleRefresh() {

  }

  const Workouts = finalWorkout.map(workout => (
    <div key={workout._id}>
      <h2>{workout.name}</h2>
    </div>
  ));
  return (
    <div>
      <h1>Daily Workouts</h1>
      <ul>
        {Workouts}
      </ul>
      <h3>Happy with this workout</h3>
      <button onClick={handleSave}>Click Me</button>
      <h3>Want another one?</h3>
      <button onClick={handleRefresh}>Click Here!</button>
    </div>
  );
  }

