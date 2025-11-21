import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedInUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedInUser(null);
  };

  const handleRegister = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedInUser(userData);
  };

  const handleUserUpdate = (section, data) => {
    const updatedUser = {
      ...loggedInUser,
      [section]: data,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setLoggedInUser(updatedUser);
  };

  return <AuthContext.Provider value={{ loggedInUser, handleLogin, handleLogout, handleRegister, handleUserUpdate }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
