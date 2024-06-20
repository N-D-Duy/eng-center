import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertCourseDataToModels } from '../components/Controller/ConvertData.js';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [course, setCourse] = useState(() => {
        // Load initial course data from localStorage if it exists
        const savedCourse = localStorage.getItem('course');
        return savedCourse ? JSON.parse(savedCourse) : null;
    });

    const [courses, setCourses] = useState(() => {
        // Load initial courses data from localStorage if it exists
        const savedCourses = localStorage.getItem('courses');
        return savedCourses ? JSON.parse(savedCourses) : [];
    });

    const fetchAllCourses = async () => {
        try {
            const response = await axios.get('http://165.232.161.56:8000/api/courses');
            if (response.status === 200) {
                const data = convertCourseDataToModels(response.data.data);
                setCourses(data);
                // Save courses data to localStorage
                localStorage.setItem('courses', JSON.stringify(data));
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

    const SetCourse = (course) => {
        setCourse(course);
        localStorage.setItem('course', JSON.stringify(course));
    };

    return (
        <CourseContext.Provider value={{ course, courses, SetCourse, setCourse, setCourses }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => React.useContext(CourseContext);
