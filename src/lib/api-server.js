import { cookies } from 'next/headers';

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'https://app.intercocina.com/api'
    : 'https://app.intercocina.com/api';

const getAuthToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get('access_token')?.value || '';
};

export const apiServer = async (endpoint, options = {}, withAuth = true) => {
    const token = withAuth ? await getAuthToken() : null;

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            //  'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY,
            'X-API-KEY': 'BUvM$K|+z)XS)kz}cOal2cg{)gJV|H$',
            Accept: 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
};