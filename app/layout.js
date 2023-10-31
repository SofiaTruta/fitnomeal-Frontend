import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/components/provider/Provider'
import WorkoutProvider from './contexts/workout-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fitnomenal',
  description: 'new workouts generated just for you!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <WorkoutProvider>
          {children}
          </WorkoutProvider>
        </Provider>
      </body>
    </html>
  )
}
