import React, { createContext, useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";
import axios from "axios";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import ChildrenProvider from "./ChildrenContext.js";
import { APIPath } from "../App.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const SetOtherUser = (data) => {
    setOtherUser(data);
    localStorage.setItem("otherUser", JSON.stringify(data));
  };


  const UpdateUser = async (newUser, _id, myAccount) => {
    try{
      console.log("Update user: ", newUser);
      const response = await axios.put(APIPath + `account/${_id}`, newUser);
      if(response.status === 200){
        if(myAccount){
          user.account = response.data.updatedAccount;  
          setUser(user);
        }else{
          otherUser.account = response.data.updatedAccount;
          setOtherUser(otherUser);
        }
        navigate(location.pathname, { replace: true });
        return true;
      }
    }catch(error){
      console.error('Error:', error);
      return false;
    }

  };

  return (
    <UserContext.Provider value={{ user, setUser, otherUser, setOtherUser: SetOtherUser, UpdateUser }}>
        <AuthProvider>
          <ChildrenProvider>
            {children}
          </ChildrenProvider>
        </AuthProvider>
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);