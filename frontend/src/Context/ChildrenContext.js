import React, { createContext, useContext, useState, useEffect } from "react";
import { useUserContext } from "./UserContext";
import { convertStudentDataToModels } from "../components/Controller/ConvertData";
import axios from "axios";
import { APIPath } from "../App.js";

const ChildrenContext = createContext();

export const useChildrenContext = () => useContext(ChildrenContext);

const ChildrenProvider = ({ children }) => {
  const { user, setUser } = useUserContext();
  const [childrenData, setChildrenData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if(!user){
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
    }
    }, []);

  const fetchData = async () => {
    try {
      // Example API call based on role
      const response = await axios.get(APIPath + `parent/${user._id}/students`);
      if (response.status === 200) {
        const data = convertStudentDataToModels(response.data.data);
        setChildrenData(data);
        localStorage.setItem("allchildren", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching children data:", error);
    }
  };

  return (
    <ChildrenContext.Provider value={{ childrenData, fetchData }}>
      {children}
    </ChildrenContext.Provider>
  );
};

export default ChildrenProvider;
