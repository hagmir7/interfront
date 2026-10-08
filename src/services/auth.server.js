import { cookies } from 'next/headers';
import { api } from '@/lib/api';

export async function getServerUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return null;

    try {
        const response = await api.get(`user`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user on server:', error);
        return null;
    }
}