import { api } from '@/lib/api';
import axios from 'axios';

export const register = async (userData) => {
    return await api.post(`register`, userData);
};

export const login = async (userData) => {
    const response = await api.post(`login`, userData);
    if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};



export const forgotPassword = async (email) => {
    return axios.post(`forgot-password`, { email });
};


export const logout = async () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) return;

    await axios.post(`logout`, {}, {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
};



export const User = async () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return null;
    }

    const user = localStorage.getItem("user");
    if (user) {
        try {
            return JSON.parse(user);
        } catch {
            localStorage.removeItem("user");
        }
    }

    const access_token = localStorage.getItem("access_token");
    if (!access_token) return null;

    try {
        const response = await api.get(`user`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        }
    } catch (error) {
        console.error("Failed to fetch user info:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        return null;
    }
};