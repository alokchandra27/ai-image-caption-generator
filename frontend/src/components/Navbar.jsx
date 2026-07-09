import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate()
  return (
    <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center text-white z-20">
      
      <div className="flex w-full items-center justify-between gap-6 font-medium tracking-wide">

        <div className='cursor-pointer active:scale-95 h-10 w-10 rounded-2xl border-amber-700 overflow-hidden'>
        <img
        onClick={()=>{
          navigate("/")
        }}
        className='h-10 w-10 object-center object-cover  '
        src="/60c665882449ec89698b95efb7edc972.webp" alt="Logo"  />
      </div>

      <div className='flex gap-10 '>
        <Link to="/register" className="hover:text-gray-300">Register</Link>
        <Link to="/login" className="hover:text-gray-300">Log In</Link>
      </div>
        
      </div>
      
      
      
    </nav>
  );
};

export default Navbar;