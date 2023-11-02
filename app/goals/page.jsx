'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { GiProgression } from 'react-icons/gi';

export default function Goals() {
// Define states
  const [userWorkoutGoal, setUserWorkoutGoal] = useState(0); // Workout goal from the database
  const [completedWorkouts, setCompletedWorkouts] = useState([]); // Array to store completed workouts
  const [currentWeight, setCurrentWeight] = useState(null); // Current weight in kg
  const [goalWeight, setGoalWeight] = useState(null); // Goal weight in kg

  const workoutsPercentage = (completedWorkouts.length/ userWorkoutGoal) * 100;
  const weightProgress = (currentWeight - goalWeight) < 0
    ? ((currentWeight - 60) / (goalWeight - 60)) * 100
    : ((goalWeight - currentWeight) / (goalWeight - 60)) * 100;

  let progressMessage = "Keep pushing, you can do it!";
  if (completedWorkouts.length >= userWorkoutGoal) {
    progressMessage = "Well done! You did it!";
  } else if (workoutsPercentage >= 50) {
    progressMessage = "Almost there, keep pushing!";
  }

  if ((currentWeight - goalWeight) < 0) {
    progressMessage = "Keep going, you can do it!";
  } else if ((currentWeight - goalWeight) > 0) {
    progressMessage = "Keep going, you can do it!";
  }

  const { data: session, status } = useSession();

  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;

  useEffect(() => {
    if (session) {
      const email = session.user.email;
      const currentDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);

      async function fetchData() {
        try {
          // Fetch user's current weight and goal weight from your API
          const response = await fetch(
            `${WORKOUT_DATA}/users/find/${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = await response.json();

          if (result) {
            setUserWorkoutGoal(result.workoutGoal);
            setCurrentWeight(result.weight);
            setGoalWeight(result.goalWeight);
          } else {
            console.error("User not found");
          }

          // Fetch and update the number of weekly workouts
          const workoutsResponse = await fetch(
            `${WORKOUT_DATA}/workout-history/history/${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const workoutsResult = await workoutsResponse.json();

          const completedWorkoutsData = workoutsResult.filter((workout) => {
            const workoutDate = new Date(workout.date);
            return workoutDate >= oneWeekAgo && workoutDate <= currentDate && workout.status === "completed";
          });

          setCompletedWorkouts(completedWorkoutsData);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }

      fetchData();
    }
  }, [session]);

  return (
    <div>
        <NavBar />
      <div className="bg-purple-100">
        <h1 className="pageTitle">Goals page</h1>
        <div className="section">
          <h2>Your Weekly Workouts</h2>
          <GiWeightLiftingUp size={40} color="purple" />
          <p>Number of Workouts this week: {completedWorkouts.length}</p>
        </div>

        <div className="section">
          <h2>Workout Progress</h2>
          <GiProgression size={40} color="purple" />

          <div className="progressBarContainer">
            <progress value={workoutsPercentage} max="100"></progress>
            <p className="progressMessage">{progressMessage}</p>
          </div>
          <p className="progressDetails">
            Your goal: {userWorkoutGoal} workouts per week
            <br />
            Workouts completed: {completedWorkouts.length}
          </p>
        </div>

        <div className="section">
          <h2>Weight Progress</h2>
          <div className="weightIcon">
            <FontAwesomeIcon icon={faWeightScale} size="2x" color="purple" />
          </div>
          <div className="progressBarContainer">
            <progress value={weightProgress} max="100"></progress>
          </div>
          <div>
            <p className="progressDetails">
              {currentWeight > goalWeight ? (
                <span>
                  Your current weight: {currentWeight} kg
                  <br />
                  Your goal weight: {goalWeight} kg
                  <br />
                  {currentWeight - goalWeight} kg more to lose till you reach your goal
                </span>
              ) : (
                <span>
                  Your current weight: {currentWeight} kg
                  <br />
                  Your goal weight: {goalWeight} kg
                  <br />
                  {goalWeight - currentWeight} kg more to gain till you reach your goal
                </span>
              )}
            </p>
          </div>
        </div>
      <Link href="/profile">
        <button className="btn btn-purple">Edit goals</button>
      </Link>
      </div>
    </div>
  );
}

