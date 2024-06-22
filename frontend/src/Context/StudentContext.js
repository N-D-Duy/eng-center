import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertStudentDataToModels } from '../components/Controller/ConvertData.js';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState(() => {
        const savedStudents = localStorage.getItem('students');
        return savedStudents ? JSON.parse(savedStudents) : [];
    });

    const fetchAllStudents = async () => {
        try {
            const response = await axios.get('http://165.232.161.56:8000/api/students');
            if (response.status === 200) {
                const data = convertStudentDataToModels(response.data.data);
                setStudents(data);
                localStorage.setItem('students', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (students.length === 0) {
            fetchAllStudents();
        }
    }, []);

   
    return (
        <StudentContext.Provider value={{ students }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => React.useContext(StudentContext);
