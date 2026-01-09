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
            console.log('Usuario actual:', currentUser);

            if (!currentUser) {
                console.log('No hay usuario, redirigiendo a login');
                router.push('/login');
                return;
            }

            // Verificar si el usuario es admin
            const isAdmin = currentUser.email === 'barbarapalmamena@gmail.com' ||
                currentUser.user_metadata?.role === 'admin';

            console.log('Email del usuario:', currentUser.email);
            console.log('Rol del usuario:', currentUser.user_metadata?.role);
            console.log('¿Es admin?:', isAdmin);

            if (!isAdmin) {
                console.log('Usuario no es admin, redirigiendo a inicio');
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
