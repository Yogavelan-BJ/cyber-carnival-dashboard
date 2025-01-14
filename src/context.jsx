import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState({});
  const eventFees = {
    cyberconclave: 150,
    capturetheflag: 300,
    cyberthon: 750,
    paperpresentation: 100,
    bugbounty: 150,
    techexpo: 0,
    startup: 0,
    freefire: 200,
    cinema: 300,
    surfing: 150,
    awareness: 0,
    workshop1: 500,
    workshop2: 500,
    title: 150,
    valo: 150,
  };
  return (
    <AppContext.Provider value={{ data, setData, eventFees }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
