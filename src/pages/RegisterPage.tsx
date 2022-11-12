import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import AuthForm from '@/components/AuthForm';
import AuthHeader from '@/components/AuthHeader';
import Footer from '@/components/Footer';
import { getUser, register } from '@/fetchRoutes/usersRoutes';
import { useAuthContext } from '@/hooks/useAuthContext';
import { FormResponseError } from '@/utils/ResponseError';
import { AuthUser, User } from '@/utils/types';

type FormFields = Record<keyof User, HTMLInputElement> & { passwordConfirm: HTMLInputElement };

function RegisterPage() {
  const userCtx = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userCtx.user) navigate('/user');
  }, [navigate, userCtx, userCtx.user]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement & FormFields> = async (e) => {
    e.preventDefault();
    try {
      const { email, password, passwordConfirm } = e.currentTarget;

      if (password.value !== passwordConfirm.value)
        throw new FormResponseError('passwords must match', 401, [
          '"password" password must matches',
          '"passwordConfirm" password must matches',
        ]);

      const { token } = await register({ email: email.value, password: password.value });
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
          { name: 'passwordConfirm', type: 'password', alias: 'confirm password' },
        ]}
      />
      <Footer />
    </>
  );
}

export default RegisterPage;
