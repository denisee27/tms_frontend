// import axios from "axios";
// import { createBrowserHistory } from "history";
// import EncryptService from "./EncryptService";

// const history = createBrowserHistory();
// const API_URL = process.env.REACT_APP_API_URL || "https://your-api-url.com";

// class AuthService {
//     constructor() {
//         this.loading = new LoadingService();
//         this.timeout = null;
//     }

//     getAuthData() {
//         const cookie = localStorage.getItem("_yourApp.globals");
//         if (!cookie) return null;
//         try {
//             return JSON.parse(EncryptService.decrypt(cookie));
//         } catch (e) {
//             return null;
//         }
//     }

//     isLoggedIn() {
//         const authData = this.getAuthData();
//         return authData?.token_type && authData?.user?.email ? true : false;
//     }

//     async reload() {
//         this.loading.start();
//         const authData = this.getAuthData() || {};
//         try {
//             const response = await axios.get(`${API_URL}/auth/profile`, {
//                 headers: { Authorization: `${authData.token_type} ${authData.access_token}` },
//             });
//             this.userData = response.data.result;
//         } catch (error) {
//             console.error("Failed to reload user data", error);
//         } finally {
//             this.loading.done();
//         }
//     }

//     async login(email, password, keepLogin = false) {
//         this.loading.start();
//         try {
//             const formData = new FormData();
//             formData.append("email", email);
//             formData.append("password", password);
//             if (keepLogin) formData.append("keepLogin", "true");

//             const response = await axios.post(`${API_URL}/auth/login`, formData);
//             this.saveAuth(response.data.result);
//             return { success: true };
//         } catch (error) {
//             return { success: false, response: error.response?.data };
//         } finally {
//             this.loading.done();
//         }
//     }

//     async loginByToken(token) {
//         this.loading.start();
//         try {
//             const response = await axios.get(`${API_URL}/auth/profile?token=${token}`);
//             const authData = {
//                 token_type: "Bearer",
//                 access_token: token,
//                 timeout: 432000,
//                 user: response.data.result,
//             };
//             this.saveAuth(authData);
//             return { success: true };
//         } catch (error) {
//             return { success: false, response: error.response?.data };
//         } finally {
//             this.loading.done();
//         }
//     }

//     async signUp(data) {
//         this.loading.start();
//         try {
//             await axios.post(`${API_URL}/auth/login`, data);
//             return { success: true };
//         } catch (error) {
//             return { success: false, response: error.response?.data };
//         } finally {
//             this.loading.done();
//         }
//     }

//     logout(noRedirect = false, direct = false) {
//         clearTimeout(this.timeout);
//         if (direct) {
//             localStorage.removeItem("_yourApp.globals");
//             return;
//         }

//         this.loading.start();
//         const authData = this.getAuthData() || {};
//         axios
//             .get(`${API_URL}/auth/logout`, {
//                 headers: { Authorization: `${authData.token_type} ${authData.access_token}` },
//             })
//             .finally(() => {
//                 localStorage.removeItem("_yourApp.globals");
//                 if (!noRedirect) {
//                     history.push("/login");
//                 }
//                 this.loading.done();
//             });
//     }

//     get userData() {
//         if (!this.isLoggedIn()) return null;
//         return this.getAuthData()?.user;
//     }

//     set userData(userData) {
//         const authData = this.getAuthData();
//         if (authData) {
//             authData.user = userData;
//             localStorage.setItem("_yourApp.globals", EncryptService.encrypt(JSON.stringify(authData)));
//         }
//     }

//     get tokenData() {
//         if (!this.isLoggedIn()) return null;
//         const authData = this.getAuthData();
//         delete authData.user;
//         return authData;
//     }

//     set tokenData(tokenData) {
//         const authData = this.getAuthData();
//         if (!authData) return;
//         authData.user = tokenData?.user || authData.user;
//         localStorage.setItem("_yourApp.globals", EncryptService.encrypt(JSON.stringify(authData)));
//     }

//     saveAuth(authData) {
//         const date = new Date();
//         date.setSeconds(date.getSeconds() + authData.timeout);
//         authData.expires = date.getTime();
//         localStorage.setItem("_yourApp.globals", EncryptService.encrypt(JSON.stringify(authData)));
//         this.refreshTimeout(authData);
//     }

//     checkTimeout() {
//         const authData = this.tokenData;
//         if (!authData) return true;

//         const currentTime = Date.now();
//         if (currentTime > authData.expires) {
//             return true;
//         }
//         return false;
//     }

//     refreshTimeout(tokenData) {
//         clearTimeout(this.timeout);
//         const authData = tokenData || this.tokenData;
//         if (!authData) return;

//         const date = new Date();
//         date.setSeconds(date.getSeconds() + authData.timeout);
//         authData.expires = date.getTime();
//         this.tokenData = authData;

//         this.timeout = setTimeout(() => {
//             console.log("Session expired");
//         }, authData.timeout * 1000);
//     }
// }

// export default new AuthService();
