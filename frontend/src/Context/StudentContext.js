import React, { createContext, useState } from 'react';
import { Student } from '../model/student.ts';
const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const initialStudent = new Student({
        _id: "6666fcdce78ce63ab2b6ebdd",
        name: "trần việt bảo",
        account: "6666fcdbe78ce63ab2b6ebdb",
        session_count: 0,
        status: "pending",
        createdAt: "2024-06-10T13:17:16.041Z",
        updatedAt: "2024-06-10T13:17:16.041Z",
        __v: 0
    });

    const [student, setStudent] = useState(initialStudent);
    const [students, setStudents] = useState([student]);

    // Hàm để cập nhật khóa học
    const updateStudent = (key, value) => {
            setStudent((prev) => {
                    const updateStudent = new Student({ ...prev, [key]: value });
                    return updateStudent;
            });
    };


    return (
        <StudentContext.Provider value={{ student, students, updateStudent}}>
               {children}
        </StudentContext.Provider>
    );
};

const useStudentContext = () => React.useContext(StudentContext);

export { useStudentContext as useParentContext };
