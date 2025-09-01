import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { BriefcaseBusiness } from 'lucide-react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
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
        {!isLoggedIn ? (
          <>
            <Link to='/login'>
              <Button variant='blue'>Login</Button>
            </Link>
            <Link to='/sign-up'>
              <Button variant='destructive'>Sign Up</Button>
            </Link>
          </>
        ) : (
          <Button variant='destructive' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
