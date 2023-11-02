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
    openModal();
    setDisplayForm(false);
  
    try {
      const response = await fetch(`${WORKOUT_DATA}/users/update`, {
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
  
      if (response.ok) {
        // Update the user data state with the new values
        setUserData((prevUserData) => ({
          ...prevUserData,
          weight: formData.weight,
          height: formData.height,
          goalWeight: formData.goalWeight,
        }));
      } else {
        console.log("Error updating user data");
      }
    } catch (error) {
      console.log("Error sending form data", error);
    }
  }
  

  return (
   <div>
    <NavBar />
    <div className="profile-container">
      <h1 className="profile-heading">Profile page</h1>
      {userData && (
        <div className="user-details">
          <h2 className="details-heading">Details</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Height: {userData.height} Cm</p>
          <p>Weight: {userData.weight} Kg</p>
          <h2 className="details-heading">Goals</h2>
          <p>Goal Weight: {userData.goalWeight} Kg</p>
        </div>
      )}
      {displayForm && (
        <div className="user-form">
          <label>Name</label>
          <input
            type="text"
            disabled
            value={userData.name}
            name="name"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="text"
            disabled
            value={userData.email}
            name="email"
            onChange={handleChange}
          />
          <label>Height</label>
          <input
            type="number"
            placeholder={userData.height}
            value={formData.height}
            name="height"
            onChange={handleChange}
          />
          <label>Weight</label>
          <input
            type="number"
            placeholder={userData.weight}
            value={formData.weight}
            name="weight"
            onChange={handleChange}
          />
          <label>Weight Goal</label>
          <input
            type="number"
            placeholder={userData.goalWeight}
            value={formData.goalWeight}
            name="goalWeight"
            onChange={handleChange}
          />
          <button onClick={submitDetails} className="submit-button">
            Submit Details
          </button>
        </div>
      )}
      <button className="edit-button" onClick={() => setDisplayForm(!displayForm)}>
        Edit Details/Close
      </button>
    </div>
    <ThankYouModal openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
  </div>
  )} 