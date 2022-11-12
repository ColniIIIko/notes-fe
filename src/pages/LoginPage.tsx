import React, { useEffect } from 'react';

import { useAuthContext } from '@/hooks/useAuthContext';
import { getUser, login } from '@/fetchRoutes/usersRoutes';
import { AuthUser, User } from '@/utils/types';
import AuthForm from '@/components/AuthForm';
import { useNavigate } from 'react-router';
import AuthHeader from '@/components/AuthHeader';
import Footer from '@/components/Footer';
import { FormResponseError } from '@/utils/ResponseError';

type FormFields = Record<keyof User, HTMLInputElement>;

function LoginPage() {
  const userCtx = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userCtx.user) navigate('/user');
  }, [navigate, userCtx, userCtx.user]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = e.currentTarget;

      const { token } = await login({ email: email.value, password: password.value });
      const { user } = await getUser(token);
      const authUser: AuthUser = {
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      userCtx.login({ ...authUser, token });
    } catch (e: any) {
      if (e instanceof FormResponseError) throw e;
      else throw new Error(e.message);
    }
  };

  return (
    <>
      <AuthHeader />
      <AuthForm
        onSubmit={handleSubmit}
        fields={[
          { name: 'email', type: 'text' },
          { name: 'password', type: 'password' },
        ]}
      />
      <Footer />
    </>
  );
}

export default LoginPage;
