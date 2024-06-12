import React, { createContext, useState } from 'react';
import { Course } from "../model/course.ts";
import { Parent } from '../model/parent.ts';

const ParentContext = createContext();

export const ParentProvider = ({ children }) => {
    const initialParent = new Parent({
        _id: "6666fcdce78ce63ab2b6ebdd",
        name: "trần việt bảo",
        account: "6666fcdbe78ce63ab2b6ebdb",
        session_count: 0,
        status: "pending",
        createdAt: "2024-06-10T13:17:16.041Z",
        updatedAt: "2024-06-10T13:17:16.041Z",
        __v: 0
    });

    const [parent, setParent] = useState(initialParent);
    const [parents, setParents] = useState([parent]);

    // Hàm để cập nhật khóa học
    const updateParent = (key, value) => {
            setParent((prevParent) => {
                    const updateParent = new Course({ ...prevParent, [key]: value });
                    return updateParent;
            });
    };


    return (
        <ParentContext.Provider value={{ parent, parents, updateParent}}>
               {children}
        </ParentContext.Provider>
    );
};

const useParentContext = () => React.useContext(ParentContext);

export { useParentContext };
