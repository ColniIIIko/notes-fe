import React from 'react';
import { Rings } from 'react-loader-spinner';

function Loader() {
  return (
    <div className='fixed top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-black opacity-40'>
      <Rings
        height='100'
        width='100'
        color='#fff4fb'
        visible={true}
      />
    </div>
  );
}

export default Loader;
