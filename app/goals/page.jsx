'use client'
import { useSession} from "next-auth/react";
import NavBar from "@/components/navbar/NavBar";
import { useEffect, useState } from "react";

export default function Goals() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState(null);

  const WORKOUT_DATA = process.env.NEXT_PUBLIC_BACKEND_CONNECTION

  useEffect(() => {
    if (session) {
      const email = session.user.email;
      async function fetchUserData() {
        try {
          const response = await fetch(`${WORKOUT_DATA}/workout-history/history/${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await response.json();
          console.log(result);
          setUserData(result); // Set user data in state
        } catch (error) {
          console.log("User not found", error);
        }
      }

      fetchUserData(); // Call the function to fetch user data
    }
  }, [session])

  return (
    <div>
      <NavBar />
      <h1>Goals page</h1>
    </div>
  )
}
