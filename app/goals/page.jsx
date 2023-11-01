'use client'
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";

export default function Goals() {
  const { data: session, status } = useSession()

  async function fetchUserData() {
    try {
      const response = await fetch(`${WORKOUT_DATA}workout-history/find/${email}`, {
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
  return (
    <div>
      <h1>Goals page</h1>
      <NavBar/>
    </div>
    

  )
}
