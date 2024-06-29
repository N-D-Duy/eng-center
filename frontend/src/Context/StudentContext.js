import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertStudentDataToModels } from '../components/Controller/ConvertData.js';
import { APIPath } from "../App.js";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState(() => {
        const savedStudents = localStorage.getItem('students');
        return savedStudents ? JSON.parse(savedStudents) : [];
    });

    const fetchAllStudents = async () => {
        try {
            const response = await axios.get(APIPath + 'students');
            if (response.status === 200) {
                const data = convertStudentDataToModels(response.data.data);
                setStudents(data);
                localStorage.setItem('students', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchStudents = async (id) => {
        try {
            const response = await axios.get(APIPath + 'student' + id);
            if (response.status === 200) {
                const data = convertStudentDataToModels(response.data.data);
                return data;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    useEffect(() => {
        if (students.length === 0) {
            fetchAllStudents();
        }
    }, []);

    const AddNewStudent = async (value) => {
        try {
            const response = await axios.post(APIPath + 'student', value);
            if (response.status === 200) {
                console.log("Student: ", response.data.data);
                return true;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <StudentContext.Provider value={{ students, AddNewStudent, fetchStudents }}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => React.useContext(StudentContext);
