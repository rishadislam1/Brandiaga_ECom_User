import axios from "axios";
import store from '../redux/store.js'; 

export const baseURL = 'https://rishadislamm1-001-site1.rtempurl.com';

// Create axios instance
const axiosSecure = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
});

// Set default API key header
axiosSecure.defaults.headers.common['X-Api-Key'] = import.meta.env.VITE_API_KEY;

// Encode Basic Auth credentials
const basicAuthUsername = "11250846";
const basicAuthPassword = "60-dayfreetrial";
const basicAuth = btoa(`${basicAuthUsername}:${basicAuthPassword}`); // Base64 encoding

// Request interceptor: add Authorization tokens
axiosSecure.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        // Add Bearer Token if present
        if (token) {
            config.headers['Authorization'] = `Bearer ${token.trim()}`;
        } else {
            delete config.headers['Authorization'];
        }

        // Always add Basic Auth header
        config.headers['Authorization-Basic'] = `Basic ${basicAuth}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: handle 401 Unauthorized
axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const errorMessage = error.response.data?.Message || '';
            console.warn("Auth error:", errorMessage);

            // Clear local auth state
            store.dispatch(logout());

            // Redirect to login
            window.location.href = '/';

            return Promise.reject(new Error("Unauthorized. Redirecting to login."));
        }

        return Promise.reject(error);
    }
);

// Export hook-style usage
const UseAxiosSecure = () => {
    return axiosSecure;
};

export default UseAxiosSecure;
