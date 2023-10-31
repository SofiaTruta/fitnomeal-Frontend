'use client'
import { useEffect, useState } from 'react';
import WorkoutDetails from './workout-details/page';

function DailyWorkoutsPage() {

  const [dailyWorkout, setDailyWorkout] = useState([]);

  <WorkoutDetails dailyWorkout={dailyWorkout}/>

  return (
    <div>
      <h1>Daily Workouts</h1>
      <ul>
        {dailyWorkout.map((exercise, index) => (
          <li key={index}>{exercise}</li>
        ))}
      </ul>
    </div>
  );
}

export default DailyWorkoutsPage;
