import React from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/pages/Layout';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import AuthProvider from '@/components/AuthProvider';
import UserPage from '@/pages/UserPage';
import NotesPage from '@/pages/NotesPage';
import NotePage from '@/pages/NotePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import NoteAddPage from '@/pages/NoteAddPage';
import NoteEditPage from '@/pages/NoteEditPage';

const routes = createBrowserRouter(
  [
    {
      path: '/',

      element: (
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      ),
      children: [
        {
          path: '/user',
          element: <UserPage />,
        },
        {
          path: '/notes',
          children: [
            {
              path: '',
              element: <NotesPage />,
            },
            {
              path: 'add',
              element: <NoteAddPage />,
            },
            {
              path: ':id',
              element: <NotePage />,
            },
            {
              path: ':id/edit',
              element: <NoteEditPage />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ],
  { basename: process.env.PUBLIC_URL || '' }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;

