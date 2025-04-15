import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useAuthService } from './authservice'; // pastikan path-nya benar

// Membuat context
const InterceptorContext = createContext();

export const InterceptorProvider = ({ children }) => {

    const { cekAuth } = useAuthService();

    const axiosInstance = useMemo(() => {
        const instance = axios.create();
        let checkTimeoutFlag = true;
        instance.interceptors.request.use(
            (config) => {
                const url = config.url || '';
                const urlHas = (term) => url.includes(term);
                let httpHeaders = {
                    'Accept': 'application/json',
                };
                if (urlHas('auth/login') || urlHas('auth/profile')) {
                    config.headers = httpHeaders;
                    return config;
                }
                const auth = cekAuth(); // pastikan cekAuth tidak undefined
                if (auth?.token_type && auth?.access_token) {
                    httpHeaders['Authorization'] = `${auth.token_type} ${auth.access_token}`;
                }
                config.headers = { ...config.headers, ...httpHeaders };
                if (urlHas('auth/refresh') || urlHas('auth/logout')) {
                    checkTimeoutFlag = false;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return instance;
    }, [cekAuth]);


    return (
        <InterceptorContext.Provider value={{ axios: axiosInstance }}>
            {children}
        </InterceptorContext.Provider>
    );
};

export const useInterceptor = () => useContext(InterceptorContext);
