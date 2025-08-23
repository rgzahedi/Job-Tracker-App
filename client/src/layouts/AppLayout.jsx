import Header from '@/components/header'
import React from 'react'
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className='grid-background absolute inset-0 -z-10'></div>

      <Header />

      <main className='flex-grow'>
        <Outlet />
      </main>

      <footer className='p-10 text-center bg-gray-800 mt-10'>
        Made by the programmer rgzahedi :)
      </footer>
    </div>
  )
}

export default AppLayout
