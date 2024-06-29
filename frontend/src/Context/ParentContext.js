import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertParentDataToModels } from '../components/Controller/ConvertData.js';

const ParentContext = createContext();

export const ParentProvider = ({ children }) => {

    const [parents, setParents] = useState(() => {
        const savedParents = localStorage.getItem('parents');
        return savedParents ? JSON.parse(savedParents) : [];
    });

    const fetchAllParents = async () => {
        try {
            const response = await axios.get('https://api.duynguyendev.xyz/api/parents');
            if (response.status === 200) {
                const data = convertParentDataToModels(response.data.data);
                setParents(data);
                localStorage.setItem('parents', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (parents.length === 0) {
            fetchAllParents();
        }
    }, []);

    const AddNewParent = async (value) => {
        try {
            const response = await axios.post('https://api.duynguyendev.xyz/api/student', value);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <ParentContext.Provider value={{ parents, AddNewParent }}>
            {children}
        </ParentContext.Provider>
    );
};

export const useParentContext = () => React.useContext(ParentContext);
