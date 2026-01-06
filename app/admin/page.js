'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../../lib/supabase';
import AdminClient from './AdminClient';

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const currentUser = await getCurrentUser();

            if (!currentUser) {
                router.push('/login');
                return;
            }

            // Verificar si el usuario es admin
            const isAdmin = currentUser.email === 'admin@tupahue.cl' ||
                currentUser.user_metadata?.role === 'admin';

            if (!isAdmin) {
                router.push('/');
                return;
            }

            setUser(currentUser);
            setLoading(false);
        }

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <p>Cargando...</p>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <AdminClient user={user} />;
}
