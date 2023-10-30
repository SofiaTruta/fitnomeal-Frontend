import Link from 'next/link'; // Import Link from Next.js
import WorkoutHistory from '../models/WorkoutHistory'; // Import your Mongoose model

function WorkoutHistoryPage({ workoutHistory }) {
  return (
    <div>
      <h1>Workout History</h1>
      <ul>
        {workoutHistory.map((entry) => (
          <li key={entry._id}>
            <Link href={`/workout-details/${entry._id}`}>
              <a>{entry.date}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}