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
            const response = await axios.get('http://165.232.161.56:8000/api/parents');
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

  

    return (
        <ParentContext.Provider value={{ parents }}>
            {children}
        </ParentContext.Provider>
    );
};

export const useParentContext = () => React.useContext(ParentContext);
