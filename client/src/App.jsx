import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import AddJob from './pages/AddJob'
import { ThemeProvider } from './components/theme-provider'
import Applications from './pages/Applications'
import ProtectedRoute from './components/protected-route'

const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element:<LandingPage />
      },
      {
        path: '/add-job',
        element: (
          <ProtectedRoute>
            <AddJob />
          </ProtectedRoute>
        )
      },
      {
        path:'/add-job/:id',
        element: (
          <ProtectedRoute>
            <AddJob/>
          </ProtectedRoute>
        )
      },
      {
        path:'/applications',
        element: (
          <ProtectedRoute>
            <Applications/>
          </ProtectedRoute>
        )
      }
    ]
  },
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
