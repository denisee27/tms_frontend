import React, { createContext, useContext, useState } from 'react';
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const start = () => setIsLoading(true);
    const done = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, start, done }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingService = () => useContext(LoadingContext);
