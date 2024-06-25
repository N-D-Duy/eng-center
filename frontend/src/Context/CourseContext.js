import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertCourseDataToModels } from '../components/Controller/ConvertData.js';
import { useUserContext } from './UserContext.js';
import { useAuthContext } from './AuthContext.js';
import AttendanceProvider from './AttendanceContext.js';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {

    const {user} = useUserContext();
    const {role} = useAuthContext();

    const [course, setCourse] = useState(() => {
        const savedCourse = localStorage.getItem('course');
        return savedCourse ? JSON.parse(savedCourse) : null;
    });

    const [courses, setCourses] = useState(() => {
        const savedCourses = localStorage.getItem('courses');
        return savedCourses ? JSON.parse(savedCourses) : [];
    });

    const fetchAllCourses = async () => {
        try {
            if(role == 'admin'){
                const response = await axios.get('http://165.232.161.56:8000/api/courses');
                if (response.status === 200) {
                    const data = convertCourseDataToModels(response.data.data);
                    setCourses(data);
                    localStorage.setItem('courses', JSON.stringify(data));
                }
            }else{
                const response = await axios.get('http://165.232.161.56:8000/api/courses');
                if (response.status === 200) {
                    const data = convertCourseDataToModels(response.data.data);
                    setCourses(data);
                    localStorage.setItem('courses', JSON.stringify(data));
                }
            }
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (courses.length === 0) {
            fetchAllCourses();
        }
    }, []);

    const setCourseData = (course) => {
        setCourse(course);
        localStorage.setItem('course', JSON.stringify(course));
    };

    const updateCourse = async (courseId, updatedData) => {
        try {
            const response = await axios.put(`http://165.232.161.56:8000/api/courses/${courseId}`, updatedData);
            if (response.status === 200) {
                const updatedCourse = response.data.data;
                const updatedCourses = courses.map(course => 
                    course.id === courseId ? updatedCourse : course
                );
                setCourses(updatedCourses);
                setCourse(updatedCourse);
                localStorage.setItem('course', JSON.stringify(updatedCourse));
                localStorage.setItem('courses', JSON.stringify(updatedCourses));
            }
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <CourseContext.Provider value={{ course, courses, setCourse: setCourseData, setCourses, updateCourse }}>
            <AttendanceProvider>
                {children}       
            </AttendanceProvider>
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => React.useContext(CourseContext);
