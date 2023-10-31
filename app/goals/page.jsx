'use client'
import { useSession } from "next-auth/react";

export default function Goals() {
  const { data: session, status } = useSession()
  console.log(session);
  return (
    <div>Goals Page</div>

  )
}
