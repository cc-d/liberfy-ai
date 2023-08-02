import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Create a new context
const LocationHistoryContext = createContext<string[]>([]);

// Create a provider that tracks history
export const LocationHistoryProvider: any = ({ children }: any) => {
  const location = useLocation();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory((prevHistory: string[]) => [...prevHistory, location.pathname]);
  }, [location]);

  useEffect(() => {
    console.log(history)
  })

  return (
    <LocationHistoryContext.Provider value={history}>
      {children}
    </LocationHistoryContext.Provider>
  );
};

// A hook to use the history
export const useLocationHistory = () => useContext(LocationHistoryContext);


