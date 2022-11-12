import React from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { NavLink } from 'react-router-dom';

function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className='py-3 flex justify-between md:flex-row flex-col gap-4 md:gap-0'>
      <div>
        <p className='text-2xl'>Hello, {user?.email}</p>
      </div>
      <div className='flex text-2xl gap-8 justify-between'>
        <nav className='flex gap-5'>
          <NavLink
            to='/user'
            className={({ isActive }) =>
              isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900 transition-all'
            }
          >
            About
          </NavLink>
          <NavLink
            to='/notes'
            className={({ isActive }) =>
              isActive ? 'text-black' : 'text-gray-500 hover:text-gray-900 transition-all'
            }
          >
            Notes
          </NavLink>
        </nav>
        <button
          onClick={() => logout()}
          className='text-red-900 self-end'
        >
          Log out
        </button>
      </div>
    </header>
  );
}

export default Header;
