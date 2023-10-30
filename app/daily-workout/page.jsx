
import { useEffect, useState } from 'react';

function DailyWorkoutsPage() {
  const [dailyWorkout, setDailyWorkout] = useState([]);

  useEffect(() => {
    fetch('/daily-workout') // Make a request to the backend API endpoint
      .then((response) => response.json())
      .then((data) => setDailyWorkout(data.dailyWorkout));
  }, []);

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

