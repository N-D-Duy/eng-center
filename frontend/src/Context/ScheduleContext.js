// src/contexts/ScheduleContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';

const ScheduleContext = createContext();

export const useScheduleContext = () => useContext(ScheduleContext);

const fakeEvents = [
    { title: 'Math Class', date: '2024-06-10' },
    { title: 'Physics Class', date: '2024-06-10' },
    { title: 'Chemistry Class', date: '2024-06-15' },
    { title: 'Biology Class', date: '2024-06-18' },
    { title: 'History Class', date: '2024-06-20' },
];


const ScheduleProvider = ({ children }) => {
    const { role } = useAuthContext();
    const [scheduleData, setScheduleData] = useState([]);

    const fetchData = async () => {
        try {
            // Example API call based on role
            //const response = await fetch(`https://api.example.com/schedule/${role}`);
            // const data = await response.json();
            const data = fakeEvents;
            console.log(data);
            setScheduleData(data);
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
