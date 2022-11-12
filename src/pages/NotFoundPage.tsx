import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='flex flex-col text-3xl font-medium text-center pt-5'>
      <p>Page not found 😞</p>
      <Link
        to='/user'
        className='text-xl text-gray-300'
      >
        go home
      </Link>
    </div>
  );
}

export default NotFoundPage;
