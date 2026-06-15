import axios from "axios";

const getAuthToken = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('access_token') || '';
    }
    return '';
};

let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'https://app.intercocina.com/api/';
} else {
    baseURL = 'https://app.intercocina.com/api/';
}

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY,
    },
});

api.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});