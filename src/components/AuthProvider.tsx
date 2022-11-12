import React, { createContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LocalStorageUser } from '@/utils/types';

type Props = {
  children: React.ReactNode;
};

type AuthContextInterface = {
  user: LocalStorageUser | null;
  login: (user: LocalStorageUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: (_: LocalStorageUser) => {},
  logout: () => {},
});

function AuthProvider({ children }: Props) {
  const [storageUser, setStorageUser] = useLocalStorage<LocalStorageUser | null>('user');

  const login = useCallback((user: LocalStorageUser) => setStorageUser(user), [setStorageUser]);

  const logout = useCallback(() => setStorageUser(null), [setStorageUser]);

  const value: AuthContextInterface = useMemo(
    () => ({ user: storageUser, login, logout }),
    [login, logout, storageUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
