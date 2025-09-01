import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import AddJob from './pages/AddJob'
import { ThemeProvider } from './components/theme-provider'
import Applications from './pages/Applications'
import LoginPage from './pages/LoginPage'
import SignPage from './pages/SignPage'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/add-job',
        element: (
          <AddJob />
        )
      },
      {
        path: '/add-job/:id',
        element: (
          <AddJob />
        )
      },
      {
        path: '/applications',
        element: (
          <Applications />
        )
      },
      {
        path: '/login',
        element: (
          <LoginPage />
        )
      },
      {
        path: '/sign-up',
        element: (
          <SignPage />
        )
      }
    ]
  },
])

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
