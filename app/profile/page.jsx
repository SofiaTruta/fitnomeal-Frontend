'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";
import ThankYouModal from "@/components/thankYouModal/ThankYouModal";

export default function Profile() {
  const [displayForm, setDisplayForm] = useState(false);
  const { data: session, status } = useSession();
  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    weight: {},
    height: {},
    goalWeight: {},
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

  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: [evt.target.value] };
    setFormData(newFormData);
    console.log(formData);
  }

  async function submitDetails() {
    openModal()
    setDisplayForm(false)
    setUserData({
      name: userData.name,
      email: userData.email,
      weight: userData.weight ,
      height: userData.height,
      goalWeight: userData.goalWeight,
    })
    setFormData({
      height: userData.height,
      weight: userData.weight,
      goalWeight: userData.goalWeight
    })
    try {
      await fetch(`${WORKOUT_DATA}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user.email,
          weight: formData.weight,
          height: formData.height,
          goalWeight: formData.goalWeight,
        }),
      });
    } catch (error) {
      console.log("error sending form data", error);
    }
  }

  return (
    <div>
      <NavBar></NavBar>
    <div style={{ margin: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>Profile page</h1>

      {userData && (
        <div style={{ margin: "10px", padding: "10px" }}>
           <h2 style={{ fontSize: "20px", marginBottom: "5px" }}>Details</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Height: {userData.height}</p>
          <p>Weight: {userData.weight}</p>
          <h2 style={{ fontSize: "20px", marginBottom: "5px" }}>Goals</h2>
          <p>Goal Weight: {userData.goalWeight}</p>
          </div>
      )}
          {/* Conditional rendering of the form */}
          {displayForm && (
            <div style={{ margin: "10px", padding: "10px" }}>
              {/* Form elements for user input */}
              <label>Name</label> <input type="text" disabled value={userData.name} name="name" onChange={handleChange} />
              <label>Email</label> <input type="text" disabled value={userData.email} name="email" onChange={handleChange} />
              <label>Height </label> <input type="number" placeholder={userData.height} value={formData.height} name="height" onChange={handleChange} />
              <label>Weight </label> <input type="number" placeholder={userData.weight}value={formData.weight} name="weight" onChange={handleChange} />
              <label>Weight Goal </label> <input type="number" placeholder={userData.goalWeight} value={formData.goalWeight} name="goalWeight" onChange={handleChange} />
              <button onClick={submitDetails}>Submit Details</button>
              <button
            onClick={submitDetails}
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
            Submit details
        </button>
            </div>
          )}

          {/* Toggle button to show/hide the form */}
          <button className="btn-pink:hover .text-color-dark" onClick={() => setDisplayForm(!displayForm)}>Edit Details</button>
          <ThankYouModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} openModal={openModal} closeModal={closeModal}/>
        </div></div>
  )} 