// src/contexts/ScheduleContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { useUserContext } from './UserContext';
import { convertScheduleDataToModel, convertScheduleDataToModels, convertStudentDataToModels } from '../components/Controller/ConvertData';
import axios from 'axios';

const ScheduleContext = createContext();

export const useScheduleContext = () => useContext(ScheduleContext);

const ScheduleProvider = ({ children }) => {
    const { role } = useAuthContext();
    const { user } = useUserContext();
    const [scheduleData, setScheduleData] = useState([]);


    useEffect(() => {
        const storedSchedule = JSON.parse(localStorage.getItem('schedule'));
        if (storedSchedule) {
            setScheduleData(storedSchedule);
        }
    }, []);

    const fetchData = async () => {
        try {
            // Example API call based on role
            const response = await axios.get(`https://api.duynguyendev.xyz/api/schedule/student/${user._id}`);
            if (response.status === 200) {
                const data = convertScheduleDataToModels(response.data.data);
                setScheduleData(data);
                localStorage.setItem('schedule', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount or whenever role changes
    }, [role]); // Listen to role ch
    return (
        <ScheduleContext.Provider value={{ scheduleData }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export default ScheduleProvider;
