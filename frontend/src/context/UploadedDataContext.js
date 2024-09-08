import React, { createContext, useState, useContext } from 'react';

// Create the context
const UploadedDataContext = createContext();

// Create a provider component
export const UploadedDataProvider = ({ children }) => {
    const [uploadedData, setUploadedData] = useState({});

    return (
        <UploadedDataContext.Provider value={{ uploadedData, setUploadedData }}>
            {children}
        </UploadedDataContext.Provider>
    );
};

// Custom hook to use the context
export const useUploadedData = () => useContext(UploadedDataContext);
