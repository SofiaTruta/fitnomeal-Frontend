'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";
import ThankYouModal from "@/components/thankYouModal/ThankYouModal";
import '../profile/profile.css'

export default function Profile() {
  const [displayForm, setDisplayForm] = useState(false);
  const { data: session, status } = useSession();
  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    weight: 0,
    height: 0,
    goalWeight: 0,
    workoutGoal: 0,
  });

const openModal = () => {
    setIsModalOpen(true)
}
const closeModal = () => {
    setIsModalOpen(false)
}


  useEffect(() => {
    if (session) {
      const email = session.user.email;
      async function fetchUserData() {
        try {
          const response = await fetch(`${WORKOUT_DATA}/users/find/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await response.json();
          setUserData(result); // Set user data in state
        } catch (error) {
          console.log("User not found", error);
        }
      }

      fetchUserData(); // Call the function to fetch user data
    }
  }, [session]);

  function handleChangeHeight(evt) {
    setFormData({
      ...formData,
     height: evt.target.value
    });
  }
  function handleChangeWeight(evt) {
    setFormData({
      ...formData,
      weight: evt.target.value
    });
  }
  function handleChangeWeightGoal(evt) {
    setFormData({
      ...formData,
      goalWeight: evt.target.value
    });
  }
  function handleChangeWorkoutGoal(evt) {
    setFormData({
      ...formData,
      workoutGoal: evt.target.value
    });
  }

  async function submitDetails() {
    openModal();
    setDisplayForm(false);
  
    try {
      const response = await fetch(`${WORKOUT_DATA}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          weight: formData.weight,
          height: formData.height,
          goalWeight: formData.goalWeight,
          workoutGoal: formData.workoutGoal,
        }),
      })
      .then(() => 
        // Update the user data state with the new values
        setUserData((prevUserData) => ({
          ...prevUserData,
          weight: formData.weight,
          height: formData.height,
          goalWeight: formData.goalWeight,
          workoutGoal: formData.workoutGoal,
        }))
      )
    } catch (error) {
      console.log("Error sending form data", error);
    }
  }
  
  function bmi() {
    const height2 = (userData?.height * userData?.height) 
    const height = (height2 / 10000)
    const height3 = height.toFixed(2)
    const bmi =  (userData?.weight / height3 )
    const finalBmi = bmi.toFixed(2)
    return finalBmi
  }
  
  const finalBmi = bmi()

  return (
    <div className="bg-purple-100 min-h-screen text-color-dark">
    <NavBar />
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Profile Page</h1>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 p-2">
          <h2 className="text-2xl mb-2">Details</h2>
          <p>Name: {userData?.name}</p>
          <p>Email: {userData?.email}</p>
          <p>Height: {userData?.height}</p>
          <p>Weight: {userData?.weight}</p>
          <p>BMI: {finalBmi}</p>
        </div>
        <div className="w-full sm:w-1/2 p-2 bg-pink-100 rounded-lg">
          <div className="bg-dark-pink p-4">
            <h2 className="text-2xl mb-2">Goals</h2>
            <p>Goal Weight: {userData?.goalWeight}</p>
            <p>Workout Goal: {userData?.workoutGoal} times a week</p>
          </div>
        </div>
      </div>
      {displayForm && (
        <div className="p-4">
          <label>Name</label>
          <input
            type="text"
            disabled
            value={userData?.name}
            name="name"
            className="w-full bg-purple-100 p-2 rounded mt-2"
          />
          <label>Email</label>
          <input
            type="text"
            disabled
            value={userData?.email}
            name="email"
            className="w-full bg-purple-100 p-2 rounded mt-2"
          />
          <label>Height</label>
          <input
            type="number"
            placeholder={userData?.height}
            name="height"
            onChange={handleChangeHeight}
            className="w-full bg-purple-100 p-2 rounded mt-2"
          />
          <label>Weight</label>
          <input
            type="number"
            placeholder={userData?.weight}
            name="weight"
            onChange={handleChangeWeight}
            className="w-full bg-purple-100 p-2 rounded mt-2"
          />
          <label>Weight Goal</label>
          <input
            type="number"
            placeholder={userData?.goalWeight}
            name="goalWeight"
            onChange={handleChangeWeightGoal}
            className="w-full bg-purple-100 p-2 rounded mt-2"
          />
          <label>Workouts per week</label>
          <input
            type="number"
            placeholder={userData?.workoutGoal}
            name="workoutGoal"
            onChange={handleChangeWorkoutGoal}
            className="w-full bg-purple-100 p-2 rounded mt-2"
          />
          <button
            onClick={submitDetails}
            className="w-full bg-purple-700 text-white p-2 rounded mt-4"
          >
            Submit Details
          </button>
        </div>
      )}
      <button
        onClick={() => setDisplayForm(!displayForm)}
        className="bg-purple-700 hover:bg-purple-800 text-white p-2 rounded mt-4"
      >
        Edit Details
      </button>
      <ThankYouModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} openModal={openModal} closeModal={closeModal} />
    </div>
  </div>
  )
}