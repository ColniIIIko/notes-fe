import React from 'react';
import { Navigate } from 'react-router';

import { useAuthContext } from '@/hooks/useAuthContext';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to='/login' />;

  return <>{children}</>;
};

export default ProtectedRoutes;
