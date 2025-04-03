import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};

export const forgotPassword = async (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
};




export const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    await axios.post(`${API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
};


export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Current authenticated user
    } catch (error) {
        return null; // Token might be invalid or expired
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
};
