import React from 'react';

function Footer() {
  return (
    <footer className='flex justify-between mt-auto py-5'>
      <span>
        Created by:{' '}
        <a
          href='https://github.com/ColniIIIko'
          className='hover:underline'
        >
          @ColniIIIko
        </a>
      </span>
      <span>BSU: 2022</span>
    </footer>
  );
}

export default Footer;
