import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NewCourseContext = createContext();

export const useNewCourseContext = () => useContext(NewCourseContext);

export const NewCourseProvider = ({ children }) => {
    const [courseData, setCourseData] = useState(() => {
        const storedCourses = JSON.parse(localStorage.getItem('newCourses'));
        if (storedCourses) {
            return storedCourses;
        }
        return [];
    });

    useEffect(() => {
        const storedCourses = JSON.parse(localStorage.getItem('newCourses'));
        if (storedCourses) {
            setCourseData(storedCourses);
        }
    }, []);

    const fetchData = async () => {
        try {
            // Gọi API để lấy dữ liệu các khóa học
            const response = await axios.get('http://165.232.161.56:8000/api/courses');
            if (response.status === 200) {
                const data = response.data.data;
                setCourseData(data);
                localStorage.setItem('newCourses', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error fetching course data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Lấy dữ liệu khi component được mount
    }, []);

    return (
        <NewCourseContext.Provider value={{ courseData }}>
            {children}
        </NewCourseContext.Provider>
    );
};

