import React, { createContext, useCallback, useContext } from 'react';
import axios from 'axios';
import { swalToastError } from './alertswal';
import { useLoadingService } from './loadingservice';
import { environment } from '../environtments/environtment';
import { useAuthService } from './authservice';

const HttpContext = createContext();

export const HttpService = ({ children }) => {
    const { setIsLoading } = useLoadingService();
    const { logout } = useAuthService();
    const apiUrl = environment.apiUrl;

    const handleError = useCallback(async (err) => {
        let errDescription = '';
        if (err.response) {
            const { status, data } = err.response;
            if (status === 401) {
                errDescription = 'Authorization invalid, please re-login';
                logout();
            } else if (status === 0) {
                errDescription = 'No Internet connection, please check your connection & try again later';
            } else if (status === 500) {
                errDescription = 'Something went wrong, please try again later';
            } else {
                errDescription = data?.wrong ? Object.values(data.wrong).join('<br>') : (data?.message || 'Unknown Error');
            }
            if (status === 423) {
                logout();
            }
        } else {
            errDescription = 'Unknown Error';
        }
        swalToastError(errDescription, { autoClose: 3000 });
    }, [logout]);

    const get = useCallback(async (urlPath, params = {}, noLoading = false) => {
        if (!noLoading) setIsLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/${urlPath}`, { params });
            let permission = response.headers['x-access'];
            permission = permission ? JSON.parse(atob(permission) || '{}') : {};
            return { success: true, response: response.data, permission };
        } catch (err) {
            handleError(err);
            return { success: false, response: err.response?.data };
        } finally {
            if (!noLoading) setIsLoading(false);
        }
    }, [apiUrl, setIsLoading, handleError]);

    const post = async (urlPath, data = {}, noLoading = false) => {
        if (!noLoading) setIsLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/${urlPath}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true, response: response.data };
        } catch (err) {
            handleError(err);
            return { success: false, response: err.response?.data };
        } finally {
            if (!noLoading) setIsLoading(false);
        }
    };

    const put = async (urlPath, data = {}, noLoading = false) => {
        if (!noLoading) setIsLoading(true);
        try {
            const response = await axios.put(`${apiUrl}/${urlPath}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true, response: response.data };
        } catch (err) {
            handleError(err);
            return { success: false, response: err.response?.data };
        } finally {
            if (!noLoading) setIsLoading(false);
        }
    };

    const patch = async (urlPath, data = {}, noLoading = false) => {
        if (!noLoading) setIsLoading(true);
        try {
            const response = await axios.patch(`${apiUrl}/${urlPath}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            return { success: true, response: response.data };
        } catch (err) {
            handleError(err);
            return { success: false, response: err.response?.data };
        } finally {
            if (!noLoading) setIsLoading(false);
        }
    };


    const postFile = async (urlPath, formData, noLoading = false) => {
        if (!noLoading) setIsLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/${urlPath}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return { success: true, response: response.data };
        } catch (err) {
            handleError(err);
            return { success: false, response: err.response?.data };
        } finally {
            if (!noLoading) setIsLoading(false);
        }
    };

    const destroy = async (urlPath, data = {}, noLoading = false) => {
        if (!noLoading) setIsLoading(true);
        try {
            const response = await axios.delete(`${apiUrl}/${urlPath}`, { data });
            return { success: true, response: response.data };
        } catch (err) {
            handleError(err);
            return { success: false, response: err.response?.data };
        } finally {
            if (!noLoading) setIsLoading(false);
        }
    };

    return (
        <HttpContext.Provider value={{ get, post, put, patch, destroy, postFile }}>
            {children}
        </HttpContext.Provider>
    );
};

export const useHttpService = () => useContext(HttpContext);
