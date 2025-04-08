import React, { createContext, useContext, useState } from 'react';
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const loadingstart = () => setIsLoading(true);
    const loadingdone = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingstart, loadingdone }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingService = () => useContext(LoadingContext);
