import axios from "axios";

const getAuthToken = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('access_token') || '';
    }
    return '';
};

let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:8000/api/';
} else {
    baseURL = 'https://interapi.facepy.com/api/';
}

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    //  withCredentials: true,
});

api.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});