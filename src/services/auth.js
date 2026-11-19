import { api } from '@/lib/api';
import Cookies from 'js-cookie';

const cookieOptions = () => ({
    expires: 30,
    path: '/',
    sameSite: 'Lax',
    secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
});

export const register = async (userData) => {
    return await api.post(`register`, userData);
};

export const login = async (userData) => {
    const response = await api.post(`login`, userData);
    if (response.data.access_token) {
        Cookies.set('access_token', response.data.access_token, cookieOptions());
        Cookies.set('user', JSON.stringify(response.data.user), cookieOptions());
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};



export const forgotPassword = async (email) => {
    return api.post(`forgot-password`, { email });
};


export const logout = async () => {
    Cookies.remove('access_token', { path: '/' });
    Cookies.remove('user', { path: '/' });
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
};



export const User = async () => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return null;
    }

    // Cached profile data is not proof of an authenticated session.
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
        if ([401, 403].includes(error.response?.status)) {
            await logout();
        }
        return null;
    }
};



/**
 * Google Login
 */
export const googleLogin = async (access_token) => {

    const response = await api.post(`auth/google/callback`, {
        access_token,
    })

    if (response.data.token) {

        Cookies.set('access_token', response.data.token, cookieOptions())

        Cookies.set('user', JSON.stringify(response.data.user), cookieOptions())

        localStorage.setItem('access_token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response.data
}


export const facebookLogin = async (access_token) => {

    const response = await api.post(`auth/facebook/callback`, {
        access_token,
    })

    if (response.data.token) {

        Cookies.set('access_token', response.data.token, cookieOptions())

        Cookies.set('user', JSON.stringify(response.data.user), cookieOptions())

        localStorage.setItem('access_token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    return response.data
}


export const updateUser = async (data) => {
    try {
        const response = await api.put('users/onboarding', data)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        return error?.response?.data
    }
}

