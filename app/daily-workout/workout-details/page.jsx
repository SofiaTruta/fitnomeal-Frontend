// make this page dynamic somehow?
'use client'
import { useState, useContext } from "react";
import { WorkoutContext } from "@/app/contexts/workout-context"



const workoutData = {
  bodyPart: "back",
  equipment: "cable",
  gifUrl: "https://v2.exercisedb.io/image/djoipjb1JqVJEJ",
  id: "0007",
  name: "alternate lateral pulldown",
  target: "lats",
  secondaryMuscles: ["biceps", "rhomboids"],
  instructions: [
    "Sit on the cable machine with your back straight and feet flat on the ground.",
    "Grasp the handles with an overhand grip, slightly wider than shoulder-width apart.",
    "Lean back slightly and pull the handles towards your chest, squeezing your shoulder blades together.",
    "Pause for a moment at the peak of the movement, then slowly release the handles back to the starting position.",
    "Repeat for the desired number of repetitions.",
  ],
};

export default function WorkoutDetails() {
  const {finalWorkout, setFinalWorkout} = useContext(WorkoutContext)
  console.log('final workout details page log',finalWorkout)

  const [showInstructions, setShowInstructions] = useState(false)
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };
  return (
    <div className="bg-light-purple flex flex-col space-y-4 justify-center items-center">
      
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg" src={workoutData.gifUrl} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workoutData.name}</h4>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Target Muscles: {workoutData.target}</p>
            {showInstructions ? (
              <div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructions:</p>
                <ol>
                  {workoutData.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            ) : null}
            <a
              href="#"
              onClick={toggleInstructions}
              className="btn btn-purple"
            >
              {showInstructions ? 'Show Less' : 'Read More'}
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={workoutData.gifUrl} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workoutData.name}</h4>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Target Muscles: {workoutData.target}</p>
          {showInstructions ? (
            <div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructions:</p>
              <ol>
                {workoutData.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          ) : null}
          <a
            href="#"
            onClick={toggleInstructions}
            className="btn btn-purple"            >
            {showInstructions ? 'Show Less' : 'Read More'}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={workoutData.gifUrl} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workoutData.name}</h4>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Target Muscles: {workoutData.target}</p>
          {showInstructions ? (
            <div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructions:</p>
              <ol>
                {workoutData.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          ) : null}
          <a
            href="#"
            onClick={toggleInstructions}
            className="btn btn-purple"            >
            {showInstructions ? 'Show Less' : 'Read More'}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={workoutData.gifUrl} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workoutData.name}</h4>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Target Muscles: {workoutData.target}</p>
          {showInstructions ? (
            <div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructions:</p>
              <ol>
                {workoutData.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          ) : null}
          <a
            href="#"
            onClick={toggleInstructions}
            className="btn btn-purple"            >
            {showInstructions ? 'Show Less' : 'Read More'}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={workoutData.gifUrl} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workoutData.name}</h4>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Target Muscles: {workoutData.target}</p>
          {showInstructions ? (
            <div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructions:</p>
              <ol>
                {workoutData.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          ) : null}
          <a
            href="#"
            onClick={toggleInstructions}
            className="btn btn-purple"            >
            {showInstructions ? 'Show Less' : 'Read More'}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
