'use client'
import Login from "@/components/login/Login"
export default function Welcome() {

  return (
    <>
      <div className="flex justify-center items-center h-screen" style={{background: 'url(https://images.unsplash.com/photo-1556139943-4bdca53adf1e?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
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

