import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useUserContext } from './UserContext';
import { convertStudentDataToModels } from '../components/Controller/ConvertData';
import axios from 'axios';

const ChildrenContext = createContext();

export const useChildrenContext = () => useContext(ChildrenContext);

const ChildrenProvider = ({ children }) => {
    const { role } = useAuthContext();
    const { user } = useUserContext();
    const [childrenData, setChildrenData] = useState([]);

    useEffect(() => {
        const storedChildren = JSON.parse(localStorage.getItem('children'));
        if (storedChildren) {
            setChildrenData(storedChildren);
        }
    }, []);

    const fetchData = async () => {
        try {
            // Example API call based on role
            const response = await axios.get(`http://165.232.161.56:8000/api/children/student/${user._id}`);
            if (response.status === 200) {
                console.log(response.data.data);
                const data = convertStudentDataToModels(response.data.data);
                setChildrenData(data);
                localStorage.setItem('children', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error fetching children data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount or whenever role changes
    }, [role]); // Listen to role changes

    return (
        <ChildrenContext.Provider value={{ childrenData }}>
            {children}
        </ChildrenContext.Provider>
    );
};

export default ChildrenProvider;
