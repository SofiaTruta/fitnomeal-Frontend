'use client'
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";
import "./workoutHistory.css"; // Import the CSS file
import { useRouter } from "next/navigation";



export default function WorkoutHistoryPage() {
  const { data: session, status } = useSession();
  const [workoutHistory, setWorkoutHistory] = useState(null);
  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;
  const router = useRouter();


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
          setWorkoutHistory(result);
        } catch (error) {
          console.log("User not found", error);
        }
      }

      fetchWorkoutHistory();
    }
  }, [session]);

  async function deleteWorkoutHistory(workoutId) {
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

  async function retryWorkout(exercises) {
    console.log(exercises);
    try {
      await fetch(`${WORKOUT_DATA}/daily-workout/newWorkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user?.email,
          exercises: exercises
        }),
      });
    } catch (error) {
      console.log("error sending form data", error);
    }
    router.push("/daily-workout/workout-details");
  }

  return (
    <div>
      <NavBar workout={workoutHistory} />
      <h1 className="text-3xl font-semibold mb-4">Workout History</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {workoutHistory ? (
          workoutHistory.map((workout, index) => (
            <div key={workout._id} className="bg-white shadow-lg rounded p-4">
              <p className="text-lg font-semibold">
                Date:{" "}
                {new Date(workout.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-600">Status: {workout.status}</p>
              <button className="btn btn-purple">
                See More
              </button>
              <button className="btn btn-purple" onClick={(() => deleteWorkoutHistory(workout._id))}>
                Delete Workout
              </button>
              <p>Workout Exercises:</p>
              {workout.exercises.map((sWorkout, index) => (
                <div key={index} className="exercise-item">
                  <p>{index + 1}. {sWorkout.name}</p>
                  { index === workout.exercises.length - 1 && (
                    <button className="btn btn-purple" onClick={(() => retryWorkout(workout.exercises))}>
                      Retry Workout
                    </button>
                 )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <h2 className="workout">No workouts added yet!</h2>
        )}
      </div>
    </div>
  );
}

