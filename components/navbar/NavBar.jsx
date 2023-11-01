import Logout from "@/components/logout/logout"
import Link from "next/link"

export default function NavBar() {
  return (
    <nav className="bg-purple-600 border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl mx-auto p-4 px-16 flex flex-wrap items-center justify-between">
    <Link href="/" className="flex items-center">
        <img src="https://i.imgur.com/LxZbfBlb.jpg" className="h-12 mr-2 rounded-full" alt="Fitnomenal Logo" />
        <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">Fitnomenal</span>
    </Link>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-purple-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
        <li>
          <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 no-underline">Home</Link>
        </li>
        <li>
          <Link href="/goals" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 no-underline">Progress</Link>
        </li>
        <li>
          <Link href="/profile" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 no-underline">Profile</Link>
        </li>
        <li>
          <Link href="/history" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 no-underline">History</Link>
        </li>
        <li>
        <Logout />
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
