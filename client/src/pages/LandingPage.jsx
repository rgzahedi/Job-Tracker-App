import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl'>
          Organize Your Job Applications
        </h1>
        <p className='text-gray-500 sm:mt-10 text-xs sm:text-xl'>
          Helping you organize your job applications in this cooked market!
        </p>
      </section>
      <div className='flex justify-center'>
        <Link to='/add-job'>
          <Button variant='blue' size='xl'>Add Application</Button>
        </Link>
      </div>

      <section className='grid grid-cols-1'>
        <div className='flex justify-center'>
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Add applications made to companies and track progress of each one!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default LandingPage