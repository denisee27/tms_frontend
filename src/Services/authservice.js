import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { EncryptService } from "./encrypt";
import { environment } from "../environtments/environtment";
import { useLoadingService } from "./loadingservice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { loadingstart, loadingdone } = useLoadingService();
    const [user, setUser] = useState(null);

    const apiUrl = environment.apiUrl;
    const httpOptions = {
        headers: { Accept: "application/json" },
    };

    const cekAuth = () => {
        const cookie = localStorage.getItem(`_${environment.appName}.globals`);
        if (!cookie) return null;
        try {
            return JSON.parse(EncryptService.decrypt(cookie));
        } catch {
            return null;
        }
    };

    const isLoggedIn = () => {
        const authData = cekAuth();
        if (!authData) return false;
        if (!authData.token_type) return false
        if (authData.user && authData.user.email) {
            return true
        } else {
            return false
        }

    };

    const saveAuth = (authData) => {
        const date = new Date();
        date.setSeconds(date.getSeconds() + authData.timeout);
        authData.expires = date.getTime();
        const encAuth = EncryptService.encrypt(JSON.stringify(authData));
        localStorage.setItem(`_${environment.appName}.globals`, encAuth);
    };

    const login = async (email, password) => {
        loadingstart();
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        try {
            const res = await axios.post(`${apiUrl}/auth/login`, data, httpOptions);
            saveAuth(res.data.result);
            setUser(res.data.result);
            return { success: true };
        } catch (err) {
            return { success: false, response: err.response?.data?.message || "Error" };
        } finally {
            loadingdone();
        }
    };

    const logout = async (navigate) => {
        loadingstart();
        const authData = cekAuth();
        try {
            await axios.get(`${apiUrl}/auth/logout`, {
                headers: {
                    ...httpOptions.headers,
                    Authorization: `${authData.token_type} ${authData.access_token}`,
                },
            });
        } catch { return true } finally {
            localStorage.removeItem(`_${environment.appName}.globals`);
            setUser(null);
            navigate('/login');
            loadingdone();
        }
    };

    // useEffect(() => {
    //     if (isLoggedIn()) {
    //         const authData = cekAuth();
    //         setUser(authData.user);
    //     }
    // }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthService = () => useContext(AuthContext);
