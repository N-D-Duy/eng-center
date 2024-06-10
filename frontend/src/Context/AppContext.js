import React, { createContext, useState } from 'react';
import { UIProvider } from './UIContext';
import { Course } from "../model/course.ts";
import { Teacher } from "../model/teacher.ts";
const AppContext = createContext();
export const AppProvider = ({ children }) => {

  const initialCourse = new Course({
    _id: '',
    name: '',
    description: '',
    category: '',
    price: 0,
    image: '',
    grade: 0,
    status: '',
    teacher: new Teacher({ name: '' }),
    createdAt: '',
    updatedAt: '',
    __v: 0
  });

const [course, setCourse] = useState(initialCourse);

// Hàm để cập nhật khóa học
const updateCourse = (key, value) => {
    setCourse((prevCourse) => {
        const updatedCourse = new Course({ ...prevCourse, [key]: value });
        return updatedCourse;
    });
};

// Hàm để cập nhật thông tin giáo viên
const updateTeacher = (name) => {
    setCourse((prevCourse) => {
        const updatedTeacher = new Teacher({ ...prevCourse.teacher, name: name });
        const updatedCourse = new Course({ ...prevCourse, teacher: updatedTeacher });
        return updatedCourse;
    });
};



  return (
    <AppContext.Provider value={{ course, updateCourse, updateTeacher}}>
        <UIProvider>
            {children}
        </UIProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);