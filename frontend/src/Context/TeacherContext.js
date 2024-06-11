import React, { createContext, useEffect, useState } from 'react';
import { Teacher } from "../model/teacher.ts";
import axios from 'axios';
import { convertCourseDataToModels } from '../components/Controller/ConvertData.js';

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    const initialTeacher = new Teacher({
        _id: "6666fcdce78ce63ab2b6ebdd",
        name: "trần việt bảo",
        account: "6666fcdbe78ce63ab2b6ebdb",
        session_count: 0,
        status: "pending",
        createdAt: "2024-06-10T13:17:16.041Z",
        updatedAt: "2024-06-10T13:17:16.041Z",
        __v: 0
    });

    const [teacher, setCourse] = useState(initialTeacher);
    const [teachers, setCourses] = useState([]);

    // Hàm để cập nhật khóa học
    const updateTeacher = (key, value) => {
            setCourse((prevCourse) => {
                    const updatedCourse = new Teacher({ ...prevCourse, [key]: value });
                    return updatedCourse;
            });
    };

    useEffect (() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        //Get all course
            try {
                const response = await axios.get('http://165.232.161.56:8000/api/teachers');
                if (response.status === 200) {
                        const data = convertCourseDataToModels(response.data.data);
                        setCourses(data);
                        console.log(data);
                } else {
                        console.error('Error:', `Unexpected response status: ${response.status}`);
                }
        } catch (error) {
                console.error('Error:', error);
        }
    };

    return (
        <TeacherContext.Provider value={{ teacher, teachers, updateTeacher}}>
                {children}
        </TeacherContext.Provider>
    );
};

const useTeacherContext = () => React.useContext(TeacherContext);

export { useTeacherContext };
