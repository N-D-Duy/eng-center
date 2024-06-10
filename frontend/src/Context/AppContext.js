import React, { createContext } from 'react';
import { UIProvider } from './UIContext';
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ }}>
        <UIProvider>
            {children}
        </UIProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);