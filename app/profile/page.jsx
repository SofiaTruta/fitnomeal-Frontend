'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";

export default function Profile() {
  const { data: session, status } = useSession();
  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (session) {
      const email = session.user.email;
      async function fetchUserData() {
        try {
          const response = await fetch(`${WORKOUT_DATA}/users/find/${email}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            },
          });

          const result = await response.json();
          setUserData(result); // Set user data in state
        } catch (error) {
          console.log('User not found', error);
        }
      }

      fetchUserData(); // Call the function to fetch user data
    }
  }, [session]);

  return (
    <div style={{ margin: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
      <NavBar></NavBar>
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
    </div>
  );
}

