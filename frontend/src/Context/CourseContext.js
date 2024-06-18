import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertCourseDataToModels } from '../components/Controller/ConvertData.js';
const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [course, setCourse] = useState();
    const [courses, setCourses] = useState([course]);
    const fetchAllCourse = async () => {
        try {
            const response = await axios.get('http://165.232.161.56:8000/api/courses');
            console.log(response);
              if (response.status === 200) {
                const data = convertCourseDataToModels(response.data.data);
                setCourses(data);
                console.log(courses);
              } 
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        fetchAllCourse();
    }, []);

    return (
        <CourseContext.Provider value={{ course, courses, setCourse, setCourses}}>
               {children}
        </CourseContext.Provider>
    );
};

const useCourseContext = () => React.useContext(CourseContext);

export { useCourseContext };
