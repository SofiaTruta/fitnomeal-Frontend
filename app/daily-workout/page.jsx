'use client'
// import { useEffect, useState } from 'react';
import WorkoutDetails from './workout-details/page';
import { WorkoutContext } from "@/app/contexts/workout-context"




function DailyWorkoutsPage() {
  const {finalWorkout, setFinalWorkout} = useContext(WorkoutContext)

  return (
    <div>
      <h1>Daily Workouts</h1>
      <ul>
        {finalWorkout.map((exercise, index) => (
          <li key={index}>{exercise}</li>
        ))}
      </ul>
    </div>
  );
}

export default DailyWorkoutsPage;
