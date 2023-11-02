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
    weight: null,
    height: null,
    goalWeight: null,
    workoutGoal: null
  });

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
    console.log(formData);
  }

  async function submitDetails() {
    router.push("/");

    try {
      await fetch(`${WORKOUT_DATA}/users/update`, {
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
    } catch (error) {
      console.log("error sending form data", error);
    }
  }

  return (
    <div>
      <h1 className="signUp">Additional SignUp Details</h1>
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
      <button className="btn btn-pink:hover btn-purple" onClick={submitDetails}>
        Submit Details
      </button>
    </div>
    </div>
  );
}
