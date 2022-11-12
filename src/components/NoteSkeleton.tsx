import React from 'react';
import { Skeleton } from '@mui/material';

function NoteSkeleton() {
  return (
    <div>
      <Skeleton
        variant='rounded'
        sx={{ width: 'clamp(300px, 60vw, 80vw)', height: '36px' }}
        className='mb-5'
      />
      <Skeleton
        variant='rounded'
        sx={{ width: 'clamp(300px, 60vw, 80vw)', height: '40vh' }}
      />
    </div>
  );
}

export default NoteSkeleton;
