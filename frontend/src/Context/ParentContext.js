import React, { Children, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { convertParentDataToModels } from '../components/Controller/ConvertData.js';
import { APIPath } from "../App.js";
import ChildrenProvider from './ChildrenContext.js';

const ParentContext = createContext();

export const ParentProvider = ({ children }) => {

    const [parents, setParents] = useState([]);

    const fetchAllParents = async () => {
        try {
            const response = await axios.get(APIPath + 'parents');
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
            console.log("Parent: ", value);
            const response = await axios.post(APIPath + 'student', value);
            if(response && response.status === 200){
                console.log("Parent: ", response.data.data);
                return true;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    return (
        <ParentContext.Provider value={{ parents, AddNewParent }}>
             {children}
        </ParentContext.Provider>
    );
};

export const useParentContext = () => React.useContext(ParentContext);
