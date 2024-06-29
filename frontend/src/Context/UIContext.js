import React, { createContext } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  
  return (
    <UIContext.Provider value={{}}>
         {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => React.useContext(UIContext);