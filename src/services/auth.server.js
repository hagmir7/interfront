import { cookies } from 'next/headers';
import { apiServer } from '@/lib/api-server';

export async function getServerUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return null;

    try {
        return await apiServer('user', {
            cache: 'no-store',
            signal: AbortSignal.timeout(10000),
        });
    } catch {
        return null;
    }
}
