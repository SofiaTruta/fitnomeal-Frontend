// 'use client'
// import { useSession} from "next-auth/react";
// import NavBar from "@/components/navbar/NavBar";
// import { useEffect, useState } from "react";

// export default function Goals() {
//   const { data: session, status } = useSession()
//   const [userData, setUserData] = useState(null);

//   const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION

//   useEffect(() => {
//     if (session) {
//       const email = session.user.email;
//       async function fetchUserData() {
//         try {
//           const response = await fetch(`${WORKOUT_DATA}/workout-history/history/${email}`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           const result = await response.json();
//           console.log(result);
//           setUserData(result); // Set user data in state
//         } catch (error) {
//           console.log("User not found", error);
//         }
//       }

//       fetchUserData(); // Call the function to fetch user data
//     }
//   }, [session])

//   return (
//     <div>
//       <NavBar />
//       <h1>Goals page</h1>
//     </div>
//   )
// }
'use client'
import React, { useState, useEffect } from "react";

const ProgressPage = () => {
  // Sample user data (you can replace this with data from your context or API)
  const userData = {
    name: "John Doe",
    targetWeight: 75, // User's target weight
    weightData: [
      { date: "2023-01-01", weight: 80 },
      { date: "2023-01-05", weight: 78 },
      { date: "2023-01-10", weight: 77 },
      // Add more weight data here
    ],
    workouts: [
      { date: "2023-01-01", workoutType: "Cardio" },
      { date: "2023-01-02", workoutType: "Strength" },
      { date: "2023-01-07", workoutType: "Cardio" },
      // Add more workout data here
    ],
  };

  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0);
  const [dailyWorkouts, setDailyWorkouts] = useState(0);

  useEffect(() => {
    // Calculate the number of workouts this week
    const today = new Date();
    const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const weeklyWorkoutCount = userData.workouts.filter(
      (workout) => new Date(workout.date) >= thisWeek
    ).length;
    setWeeklyWorkouts(weeklyWorkoutCount);

    // Calculate the number of workouts today
    const formattedToday = today.toISOString().slice(0, 10);
    const dailyWorkoutCount = userData.workouts.filter(
      (workout) => workout.date === formattedToday
    ).length;
    setDailyWorkouts(dailyWorkoutCount);
  }, [userData.workouts]);

  const currentWeight = userData.weightData.length > 0 ? userData.weightData[userData.weightData.length - 1].weight : null;
  const weightProgress = userData.targetWeight - currentWeight;

  return (
    <div>
      <h2>{userData.name}'s Progress Page</h2>
      <p>Daily Workouts: {dailyWorkouts}</p>
      <p>Workouts This Week: {weeklyWorkouts}</p>
      <p>Current Weight: {currentWeight ? currentWeight + " kg" : "N/A"}</p>
      {currentWeight && (
        <p>
          Weight Progress: {weightProgress > 0 ? "Lost" : "Gained"} {Math.abs(weightProgress)} kg
        </p>
      )}
      {userData.targetWeight && currentWeight && (
        <p>
          Progress Towards Target Weight: {weightProgress > 0 ? "Under" : "Over"} by {Math.abs(weightProgress)} kg
        </p>
      )}
    </div>
  );
};

export default ProgressPage;
