import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertTeacherDataToModels } from '../components/Controller/ConvertData.js';

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://165.232.161.56:8000/api/teachers');
            if (response.status === 200) {
                const data = convertTeacherDataToModels(response.data.data);
                setTeachers(data);
                console.log(data);
            } else {
                console.log(response.status);
            }
        } catch (error) {
            console.error('fetchTeachers error:', error);
        } finally {
                console.log('fetchTeachers done');
        }
    };

    const updateTeacher = (id, key, value) => {
        setTeachers(prevTeachers => {
            return prevTeachers.map(teacher => {
                if (teacher._id === id) {
                    return { ...teacher, [key]: value };
                }
                return teacher;
            });
        });
    };

    return (
        <TeacherContext.Provider value={{ teachers, updateTeacher}}>
            {children}
        </TeacherContext.Provider>
    );
};

const useTeacherContext = () => React.useContext(TeacherContext);

export { useTeacherContext };
