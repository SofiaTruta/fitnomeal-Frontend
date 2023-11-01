'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function firstLogin() {
  const { data: session, status } = useSession()
  console.log(session);
  const userName = session?.user?.name
  const userEmail = session?.user?.email

  const router = useRouter()

  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION

  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
    weight: 0,
    height: 0,
    goalWeight: 0,
  })

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: [evt.target.value] };
    setFormData(newFormData);
    console.log(formData);
  }

  async function submitDetails() {
    router.push("/")
    try {
      await fetch(`${WORKOUT_DATA}/users/update`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          weight: formData.weight,
          height: formData.height,
          goalWeight: formData.goalWeight,
          firstLogin: 'false'
        })
      })
    } catch (error) {
      console.log('error sending form data', error)
    }
  }

  return (
    <div>
      <label>Name</label> <input type="text" value={userName} name="name" onChange={handleChange} />
      <label>Email</label> <input type="text" value={userEmail} name="email" onChange={handleChange} />
      <label>Weight </label> <input type="number" placeholder="Kg" value={formData.weight} name="weight" onChange={handleChange} />
      <label>Height </label> <input type="number" placeholder="Inches" value={formData.height} name="height" onChange={handleChange} />
      <label>Goal weight </label> <input type="number" placeholder="Kg" value={formData.goalWeight} name="goalWeight" onChange={handleChange} />
      <button onClick={submitDetails}>Submit Details</button>
    </div>
  )
}
