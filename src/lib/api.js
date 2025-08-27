import axios from "axios";

const getAuthToken = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('authToken') || '';
    }
    return '';
};

let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'https://interapi.facepy.com/api/'; // Use 127.0.0.1 instead of localhost
} else {
    baseURL = 'https://interapi.facepy.com/api/';
}

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

api.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});