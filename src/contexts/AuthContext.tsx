import { ReactNode, createContext, useContext, useState } from 'react';
import { Customer } from '@typings/shop/customer';

interface AuthContextType {
  loggedInUser: Customer | null;
  handleLogin: (userData: Customer) => void;
  handleLogout: () => void;
  handleRegister: (userData: Customer) => void;
  handleUserUpdate: <K extends 'email' | 'shipping' | 'billing'>(section: K, data: Customer[K]) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  loggedInUser: null,
  handleLogin: () => {},
  handleLogout: () => {},
  handleRegister: () => {},
  handleUserUpdate: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<Customer | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (userData: Customer) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedInUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedInUser(null);
  };

  const handleRegister = (userData: Customer) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedInUser(userData);
  };

  const handleUserUpdate = <K extends 'email' | 'shipping' | 'billing'>(section: K, data: Customer[K]) => {
    if (!loggedInUser) return;

    const updatedUser = {
      ...loggedInUser,
      [section]: data,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setLoggedInUser(updatedUser);
  };

  return <AuthContext.Provider value={{ loggedInUser, handleLogin, handleLogout, handleRegister, handleUserUpdate }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  return useContext(AuthContext);
};
