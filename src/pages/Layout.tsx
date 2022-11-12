import React from 'react';
import { Outlet } from 'react-router';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

function Layout() {
  return (
    <>
      <Header />
      <main className='max-w-180 flex flex-col justify-center'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
