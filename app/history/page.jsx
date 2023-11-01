'use client'
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";

export default function WorkoutHistoryPage() {
  const { data: session, status } = useSession();
  const [workoutHistory, setWorkoutHistory] = useState(null);

  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;

  useEffect(() => {
    if (session) {
      const email = session.user.email;
      async function fetchWorkoutHistory() {
        try {
          const response = await fetch(
            `${WORKOUT_DATA}/workout-history/history/${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = await response.json();
          console.log(result);
          setWorkoutHistory(result); // Set user data in state
        } catch (error) {
          console.log("User not found", error);
        }
      }

      fetchWorkoutHistory(); // Call the function to fetch user data
    }
  }, [session]);

  return (
    <div>
      <NavBar workout={workoutHistory} />
      <h1 style={{ fontSize: "24px", margin: "10px", padding: "10px" }}>
        WorkoutHistoryPage
      </h1>
      <div>
        {workoutHistory &&
          workoutHistory.map((workout, index) => (
            <div key={workout._id}>

              <p style={{ fontSize: "18px", margin: "5px" }}>Date: {new Date(workout.date).toLocaleDateString()}</p>
              <p>Status: {workout.status}</p>
              {workout.exercises.map((sWorkout, index) => (
          <div key={index}>
            {sWorkout.name}
            </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
