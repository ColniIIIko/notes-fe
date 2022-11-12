import React from 'react';
import { Skeleton } from '@mui/material';

function NotesSkeleton() {
  return (
    <div className='flex gap-5 flex-col'>
      <Skeleton
        variant='rounded'
        sx={{ width: 'clamp(300px, 30vw, 80vw)', height: '55px' }}
      />
      <Skeleton
        variant='rounded'
        sx={{ width: 'clamp(300px, 30vw, 80vw)', height: '55px' }}
      />
      <Skeleton
        variant='rounded'
        sx={{ width: 'clamp(300px, 30vw, 80vw)', height: '55px' }}
      />
      <Skeleton
        variant='rounded'
        sx={{ width: 'clamp(300px, 30vw, 80vw)', height: '55px' }}
      />
    </div>
  );
}

export default NotesSkeleton;
