import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/clerk-react'
import { BriefcaseBusiness } from 'lucide-react'

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams()

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true)
    }
  }, [search])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({})
    }
  }

  return (
    <>
      <nav className='py-4 px-20 flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Link className='flex items-center space-x-4'>
            <img src="/briefcase.png" className='h-20' />
            <div className='flex flex-col items-center justify-center gradient-title text-4xl font-bold'>
              Job Tracker App
            </div>
          </Link>
        </div>


        <div className='flex gap-8'>
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-20 h-20 rounded-full",
                userButtonTrigger: "w-20 h-20",
                avatarImage: "w-20 h-20 object-cover"
              }
            }}>

              <UserButton.MenuItems>
                <UserButton.Link 
                  label='My Applications'
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href='/applications'
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn &&
        <div className='fixed inset-0 flex items-center justify-center backdrop-blur-sm' onClick={handleOverlayClick}>
          <SignIn
            signUpForceRedirectUrl='/applications'
            fallbackRedirectUrl='/applications'
          />
        </div>}
    </>
  )
}

export default Header