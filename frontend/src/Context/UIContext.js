import React, { createContext } from 'react';
import { AuthProvider } from './AuthContext';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  
  return (
    <UIContext.Provider value={{}}>
        <AuthProvider>

      {children}
        </AuthProvider>
    </UIContext.Provider>
  );
};

export const useUIContext = () => React.useContext(UIContext);