'use client'
import { useEffect, useState, useContext } from 'react';
import { WorkoutContext } from "@/app/contexts/workout-context"
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import NewWorkoutModal from '@/components/newWorkoutModal/NewWorkoutModal';

export default function DailyWorkoutsPage() {
  const { finalWorkout, setFinalWorkout } = useContext(WorkoutContext)
  const [choice, setChoice] = useState('Full Body')

  console.log(finalWorkout);
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

  const Workouts = finalWorkout.map((workout, index) => (
    <div key={workout._id} style={{ backgroundColor: "#f5f5f5", margin: "10px", padding: "10px" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "5px" }}>{index + 1}. {workout.name}</h2>
    </div>
  ));
  return (
    <div>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Daily Workouts</h1>
      <ul>
        {Workouts}
      </ul>
      <h3 style={{ fontSize: "16px" }}>Happy with this workout</h3>
      <button style={{ fontSize: "16px", backgroundColor: "#007BFF", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "4px" }} onClick={handleSave}>Click Me</button>
      <h3 style={{ fontSize: "16px" }}>Want another one?</h3>
      <NewWorkoutModal choice={choice} setChoice={setChoice}/>
    </div>
  );
}


