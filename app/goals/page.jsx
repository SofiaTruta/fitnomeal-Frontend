'use client'
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { GiWeightLiftingUp } from 'react-icons/gi'
import { GiProgression } from 'react-icons/gi';



export default function Goals() {
  // Hard-coded data for demonstration
  const weeklyGoal = 5; // Number of workouts per week
  const workoutsCompleted = 4; // Number of workouts completed
  const currentWeight = 60; // Current weight in kg
  const goalWeight = 80; // Goal weight in kg

  // Calculate the percentage of workouts completed
  const workoutsPercentage = (workoutsCompleted / weeklyGoal) * 100;

  // Calculate the weight gain progress
  const weightProgress = ((currentWeight - 60) / (goalWeight - 60)) * 100;

  // Define a message based on the workouts progress
  let workoutsMessage = "Keep pushing, you can do it!";
  if (workoutsCompleted >= weeklyGoal) {
    workoutsMessage = "Well done! You did it!";
  } else if (workoutsPercentage >= 50) {
    workoutsMessage = "Almost there, keep pushing!";
  }
  const { data: session, status } = useSession();
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(0);

  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;

  useEffect(() => {
    if (session) {
      const email = session.user.email;
      const currentDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);

      async function fetchWeeklyWorkouts() {
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

          // Filter the workouts for the past week
          const weeklyWorkoutsData = result.filter((workout) => {
            const workoutDate = new Date(workout.date);
            return workoutDate >= oneWeekAgo && workoutDate <= currentDate;
          });

          // Update the state with the number of weekly workouts
          setWeeklyWorkouts(weeklyWorkoutsData.length);
        } catch (error) {
          console.log("User not found", error);
        }
      }

      fetchWeeklyWorkouts(); // Call the function to fetch user data
    }
  }, [session]);

  return (
    <div>
      <div className="container">
        <NavBar />
        <h1 className="pageTitle">Goals page</h1>
        <div className="section">
          <h2>Your Weekly Workouts</h2>
          <GiWeightLiftingUp size={40} color="purple" />
          <p>Number of Workouts this week: {weeklyWorkouts}</p>
        </div>

        <div className="section">
          <h2>Workout Progress</h2>
          <GiProgression size={40} color="purple" />

          <div className="progressBarContainer">
            <progress value={workoutsPercentage} max="100"></progress>
            <p className="progressMessage">{workoutsMessage}</p>
          </div>
          <p className="progressDetails">
            Your goal: {weeklyGoal} workouts per week
            <br />
            Workouts completed: {workoutsCompleted}
          </p>
        </div>

        <div className="section">
          
          <h2>Weight Gain Progress</h2>
            <div className="weightIcon">
            <FontAwesomeIcon icon={faWeightScale} size="2x" color="purple" />
          </div>
          <div className="progressBarContainer">
            <progress value={weightProgress} max="100"></progress>
            </div>
            <div>
            <p className="progressDetails">
              Your current weight: {currentWeight} kg
              <br />
              Your goal weight: {goalWeight} kg
              <br />
              {goalWeight - currentWeight} kg more to gain till you reach your goal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

