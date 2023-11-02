'use client'
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";
import "./workoutHistory.css"; // Import the CSS file

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
          setWorkoutHistory(result);
        } catch (error) {
          console.log("User not found", error);
        }
      }

      fetchWorkoutHistory();
    }
  }, [session]);

  async function deleteWorkoutHistory(workoutId) {
    console.log(workoutId);
    try {
      await fetch(`${WORKOUT_DATA}/workout-history/delete/${workoutId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      setWorkoutHistory((prevWorkoutHistory) =>
        prevWorkoutHistory.filter((workout) => workout._id !== workoutId)
      );
    } catch (error) {
      console.log("Couldn't delete not found", error);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="workout-history-container">
        <h1 className="page-heading">Workout History Page</h1>
        {workoutHistory &&
          workoutHistory.map((workout, index) => (
            <div key={workout._id} className="workout-card">
              <p className="workout-date">
                Date: {new Date(workout.date).toLocaleDateString()}
              </p>
              <p className="workout-status">Status: {workout.status}</p>
              <div className="exercise-list">
                <p>Workout Steps:</p>
                {workout.exercises.map((sWorkout, index) => (
                  <div key={index} className="exercise-item">
                    <p>{index + 1}. {sWorkout.name}</p>
                  </div>
                ))}
              </div>
              <button className="btn deleteButton"
                onClick={(() =>
                  deleteWorkoutHistory(workout._id)
                )}>DELETE</button>
            </div>
          ))}
      </div>
      {workoutHistory && workoutHistory.length > 0 ? (
        workoutHistory.map((workout, index) => (
          <div></div>
      ))
      ) : (
        <h2 className="workout">No workouts added yet!</h2>
      )} 
    </div>
  );
}

