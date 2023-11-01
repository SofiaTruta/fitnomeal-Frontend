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
          const response = await fetch(`${WORKOUT_DATA}/workout-history/history/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

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


// const Workouts = workoutHistory.map(workout => (
//   <div key={index}>
//     <h2>{workout.name}</h2>
//     <img src={workout.gifUrl} alt="Workout GIF" />
//   </div>
// ));

  return (
    <div>
      <NavBar workout={workoutHistory} />
      <h1>WorkoutHistoryPage</h1>
      {workoutHistory ? (
        workoutHistory.map((workout, index) => (
          <div key={index}>
            <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
            <p>Status: {workout.status}</p>
          </div>
        ))
      ) : (
        <p>Loading workout history...</p>
      )}
    </div>
  );
}
