import React from 'react';
import { NavLink } from 'react-router-dom';

function AuthHeader() {
  return (
    <header className='py-3'>
      <nav className='flex gap-5 text-2xl justify-end'>
        <NavLink
          to='/login'
          className={({ isActive }) => (isActive ? 'text-black' : 'text-gray-500 transition-all')}
        >
          Login
        </NavLink>
        <NavLink
          to='/register'
          className={({ isActive }) =>
            isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900 transition-all'
          }
        >
          Register
        </NavLink>
      </nav>
    </header>
  );
}

export default AuthHeader;
