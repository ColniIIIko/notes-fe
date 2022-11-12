import React from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { Link } from 'react-router-dom';

function UserPage() {
  const { user } = useAuthContext();

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col pt-5'>
        <h2 className='self-start text-4xl'>About</h2>
        <div className='pt-10 text-xl mb-2'>
          <p>
            <b className='font-medium'>Email:</b> {user?.email}
          </p>
          <p>
            <b className='font-medium'>Date sign up:</b>{' '}
            {new Date(user?.createdAt || '').toDateString()}
          </p>
        </div>
        <Link
          to='/notes'
          className='underline underline-offset-2 text-lg'
        >
          Go to notes
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
