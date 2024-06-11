import React, { createContext} from 'react';
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);