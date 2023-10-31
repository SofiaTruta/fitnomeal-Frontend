'use client'
import Login from "@/components/login/Login"
export default function Welcome() {

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Fitnomenal</h1>
          <p className="mb-3 text-lg text-gray-500 md:text-xl">break the monotony</p>
          <p className="mb-3 text-lg text-gray-500 md:text-xl">freshly generated workouts every day</p>
          <Login />
        </div>
      </div>
    </>
  )
}

