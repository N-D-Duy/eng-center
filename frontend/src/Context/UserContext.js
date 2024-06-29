import React, { createContext, useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const UpdateUser = async (newUser, _id) => {
    try{
      console.log("Update user: ", newUser);
      const response = await axios.put('http://165.232.161.56:8000/api/account/' + _id, newUser);
      if(response.status === 200){
        console.log("Update user successfully");
        return true;
      }
    }catch(error){
      console.error('Error:', error);
      return false;
    }

  };

  return (
    <UserContext.Provider value={{ user, setUser, otherUser, setOtherUser, UpdateUser }}>
        <AuthProvider>
            {children}
        </AuthProvider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);