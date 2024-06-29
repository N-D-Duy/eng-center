import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertTeacherDataToModels } from '../components/Controller/ConvertData.js';
import { APIPath } from "../App.js";

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    
    const [teachers, setTeachers] = useState(() => {
        const savedTeachers = localStorage.getItem('teachers');
        return savedTeachers ? JSON.parse(savedTeachers) : [];
    });

    const fetchAllTeachers = async () => {
        try {
            const response = await axios.get(APIPath + "teachers");
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


    const AddNewTeacher = async (teacher) => {
        try {
            console.log(teacher);
            const response = await axios.post(APIPath + "teacher", teacher);
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    return (
        <TeacherContext.Provider value={{teachers, AddNewTeacher }}>
            {children}
        </TeacherContext.Provider>
    );
};

export const useTeacherContext = () => React.useContext(TeacherContext);
