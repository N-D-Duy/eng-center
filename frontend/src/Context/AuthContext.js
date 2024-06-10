import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleLogin = (userRole) => {
    setLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, role, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);