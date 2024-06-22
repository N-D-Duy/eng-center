import React, { createContext, useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        console.log('Stored User:', JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, otherUser, setOtherUser }}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);