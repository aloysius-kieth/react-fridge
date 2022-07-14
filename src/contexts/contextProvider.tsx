import React, { createContext, useContext, useState } from "react";

type StateContextType = {
  isSidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  screenSize: number;
  setScreenSize: React.Dispatch<React.SetStateAction<number>>;
};

const StateContext = createContext<StateContextType>({} as StateContextType);

export const ContextProvider = ({ children }: any) => {
  const [screenSize, setScreenSize] = useState(720);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <StateContext.Provider
      value={{ isSidebarOpen, setSidebarOpen, screenSize, setScreenSize }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
