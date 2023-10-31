'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function firstLogin() {
    const { data: session, status } = useSession()
    console.log(session);
    const userName = session?.user?.name
    const userEmail = session?.user?.email

    const [formData, setFormData] = useState({
        name:{userName},
        email:{userEmail},
        weight:"",
        height: "",
        goalWeight:"",
    })
   
    function handleChange(evt) {
        const newFormData = { ...formData, [evt.target.name]: [evt.target.value] };
        setFormData(newFormData);
        console.log(formData);
    }
 
    return (
    <div>
      <form>
        <label>Name</label> <input type="text" placeholder={value} value={formData.name} name="name" onChange={handleChange}/>
        <label>Email</label> <input type="text" placeholder={value} value={formData.email} name="email" onChange={handleChange}/>
        <label>Weight </label> <input type="number" placeholder="Kg" value={formData.weight} name="weight" onChange={handleChange}/>
        <label>Height </label> <input type="number" placeholder="Inches" value={formData.height} name="height" onChange={handleChange}/>
        <label>Goal weight </label> <input type="number" placeholder="Kg" value={formData.goalWeight} name="goalWeight" onChange={handleChange}/>
      </form>
    </div>
  )
}
