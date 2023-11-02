'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../first-login/first-login.css" // Import the CSS file

export default function FirstLogin() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const router = useRouter();
  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;

  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    weight: 0,
    height: 0,
    goalWeight: 0,
    workoutGoal: 0
  });

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }

  async function submitDetails() {
    try {
      const response = await fetch(`${WORKOUT_DATA}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          weight: formData.weight,
          height: formData.height,
          goalWeight: formData.goalWeight,
          workoutGoal: formData.workoutGoal,
          firstLogin: "false",
        }),
      });
      if (response.ok) {
        router.push("/");
      }

    } catch (error) {
      console.log("error sending form data", error);
    }
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen" style={{background:'url(https://images.unsplash.com/photo-1556139943-4bdca53adf1e?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <h1 className="text-center text-4xl font-extrabold signUp">Tell us more about yourself</h1>
      <div className="form-container">
        <label className="form-label">Name</label>
        <input
          disabled
          className="form-input"
          type="text"
          value={userName}
          name="name"
          onChange={handleChange}
        />
        <label className="form-label">Email</label>
        <input
          disabled
          className="form-input"
          type="text"
          value={userEmail}
          name="email"
          onChange={handleChange}
        />
        <label className="form-label">Height</label>
        <input
          className="form-input"
          type="number"
          placeholder="CM"
          value={formData.height}
          name="height"
          onChange={handleChange}
        />
        <label className="form-label"></label>
        <label className="form-label">Weight</label>
        <input
          className="form-input"
          type="number"
          placeholder="Kg"
          value={formData.weight}
          name="weight"
          onChange={handleChange}
        />
        <label className="form-label">Goal weight</label>
        <input
          className="form-input"
          type="number"
          placeholder="Kg"
          value={formData.goalWeight}
          name="goalWeight"
          onChange={handleChange}
        />
        <label className="form-label">Workouts per week</label>
        <input
          className="form-input"
          type="number"
          placeholder="3"
          value={formData.workoutGoal}
          name="workoutGoal"
          onChange={handleChange}
        />
        <div className="flex flex-col justify-center items-center">
        <button className="btn btn-pink:hover btn-purple mt-4" onClick={submitDetails}>
          Submit Details
        </button>
        </div>
      </div>
    </div>
  );
}
