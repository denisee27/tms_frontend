import React, { createContext, useCallback, useContext, useState } from 'react';
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const loadingstart = useCallback(() => setIsLoading(true), []);
    const loadingdone = useCallback(() => setIsLoading(false), []);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingstart, loadingdone }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingService = () => useContext(LoadingContext);
