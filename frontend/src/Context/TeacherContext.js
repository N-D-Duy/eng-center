import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertTeacherDataToModels } from '../components/Controller/ConvertData.js';

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    
    const [teachers, setTeachers] = useState(() => {
        const savedTeachers = localStorage.getItem('teachers');
        return savedTeachers ? JSON.parse(savedTeachers) : [];
    });

    const fetchAllTeachers = async () => {
        try {
            const response = await axios.get('http://165.232.161.56:8000/api/teachers');
            if (response.status === 200) {
                const data = convertTeacherDataToModels(response.data.data);
                setTeachers(data);
                // Save teachers data to localStorage
                localStorage.setItem('teachers', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (teachers.length === 0) {
            fetchAllTeachers();
        }
    }, []);


    return (
        <TeacherContext.Provider value={{teachers }}>
            {children}
        </TeacherContext.Provider>
    );
};

export const useTeacherContext = () => React.useContext(TeacherContext);
