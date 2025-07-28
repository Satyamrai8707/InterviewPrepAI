import axios from 'axios';
import { API_BASE_URL } from './apiPath';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add a response interceptor to handle errors globally

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            //redirect to login or handle unauthorized access
            window.location.href = '/login'; // Redirect to login page
            // Handle unauthorized access, e.g., redirect to login
            console.error('Unauthorized access - redirecting to login');
            // Optionally, you can redirect to a login page or show a notification
        }
        else if (error.response && error.response.status === 403) {
            // Handle forbidden access
            console.error('Forbidden access - you do not have permission to perform this action');
        } else if (error.response && error.response.status === 500) {
            // Handle server errors
            console.error('Server error - please try again later');
        } 
        else if (error.code === 'ECONNABORTED') {
            // Handle timeout errors
            console.error('Request timed out - please try again later');
        } 
        else if (error.message === 'Network Error') {
            // Handle network errors
            console.error('Network error - please check your internet connection');
        }
        else {
            // Handle other errors
            console.error('An error occurred:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;