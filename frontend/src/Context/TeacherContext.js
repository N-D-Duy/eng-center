import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertTeacherDataToModels } from '../components/Controller/ConvertData.js';

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    const [teacher, setTeacher] = useState(() => {
        // Load initial teacher data from localStorage if it exists
        const savedTeacher = localStorage.getItem('teacher');
        return savedTeacher ? JSON.parse(savedTeacher) : null;
    });

    const [teachers, setTeachers] = useState(() => {
        // Load initial teachers data from localStorage if it exists
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

    const SetTeacher = (teacher) => {
        setTeacher(teacher);
        localStorage.setItem('teacher', JSON.stringify(teacher));
    };

    return (
        <TeacherContext.Provider value={{ teacher, teachers, SetTeacher, setTeacher, setTeachers }}>
            {children}
        </TeacherContext.Provider>
    );
};

export const useTeacherContext = () => React.useContext(TeacherContext);
