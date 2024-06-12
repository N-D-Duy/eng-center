import React, { createContext, useState } from 'react';
import { Course } from "../model/course.ts";
import { Teacher } from "../model/teacher.ts";
import logo from "../img/logo192.png";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const initialCourse = new Course({
            _id: "6666fd50e78ce63ab2b6ebe6",
            name: "english advanced",
            description: "second course",
            category: "advanced",
            price: 4,
            image: logo,
            grade: 3, 
            status: "active",
            teacher: new Teacher( {
                _id: "6666fcdce78ce63ab2b6ebdd",
                name: "trần việt bảo",
                account: "6666fcdbe78ce63ab2b6ebdb",
                session_count: 0,
                status: "pending",
                createdAt: "2024-06-10T13:17:16.041Z",
                updatedAt: "2024-06-10T13:17:16.041Z",
                __v: 0
            }),
            createdAt: "2024-06-10T13:19:12.422Z",
            updatedAt: "2024-06-11T00:26:30.253Z",
            __v: 0,
    });

    const [course, setCourse] = useState(initialCourse);
    const [courses, setCourses] = useState([course]);

    // Hàm để cập nhật khóa học
    const updateCourse = (key, value) => {
            setCourse((prevCourse) => {
                    const updatedCourse = new Course({ ...prevCourse, [key]: value });
                    return updatedCourse;
            });
    };


    return (
        <CourseContext.Provider value={{ course, courses, updateCourse}}>
               {children}
        </CourseContext.Provider>
    );
};

const useCourseContext = () => React.useContext(CourseContext);

export { useCourseContext };
