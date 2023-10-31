'use client'
import { useEffect, useState, useContext} from 'react';
import WorkoutDetails from './workout-details/page';
import { WorkoutContext } from "@/app/contexts/workout-context"
import { setRequestMeta } from 'next/dist/server/request-meta';

function DailyWorkoutsPage() {
  const {finalWorkout, setFinalWorkout} = useContext(WorkoutContext)
  const {completeWorkout, setCompleteWorkout} = useState()
  setCompleteWorkout(finalWorkout)
  console.log(finalWorkout);

  const Workouts = completeWorkout.map(workout => (
    <div key={workout._id}>
        <h2>{workout.name}</h2>
    </div>
));  
  return (
    <div>
      <WorkoutDetails workouts={completeWorkout}/>
      <h1>Daily Workouts</h1>
      <ul>
        {Workouts}
      </ul>
    </div>
  );
}

export default DailyWorkoutsPage;
