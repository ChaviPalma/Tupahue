'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signOut } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';
import styles from './admin.module.css';

export default function AdminClient({ user }) {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('todas'); // todas, activas, devueltas
    const router = useRouter();

    useEffect(() => {
        fetchReservas();
    }, []);

    async function fetchReservas() {
        try {
            // Obtener el token del usuario actual
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                console.error('No hay sesión activa');
                setReservas([]);
                setLoading(false);
                return;
            }

            // Llamar a la API que tiene acceso a los datos de usuarios
            const response = await fetch('/api/admin/reservas', {
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener reservas');
            }

            const { data } = await response.json();
            setReservas(data || []);
        } catch (error) {
            console.error('Error fetching reservas:', error);
            setReservas([]);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        await signOut();
        router.push('/');
    };

    const filteredReservas = reservas.filter(reserva => {
        if (filter === 'activas') return reserva.estado === 'activa';
        if (filter === 'devueltas') return reserva.estado === 'devuelto';
        return true;
    });

    const getDaysRemaining = (createdAt) => {
        const created = new Date(createdAt);
        const dueDate = new Date(created);
        dueDate.setDate(dueDate.getDate() + 14);
        const today = new Date();
        const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const getStatusColor = (days) => {
        if (days < 0) return '#dc3545'; // Rojo - atrasado
        if (days <= 3) return '#ffc107'; // Amarillo - próximo a vencer
        return '#28a745'; // Verde - tiempo suficiente
    };

    return (
        <div className={styles.pageContainer}>
            <Navbar user={user} onLogout={handleLogout} />

            <div className={styles.container}>
                <h1 className={styles.title}>Panel de Administración</h1>
                <p className={styles.subtitle}>Gestión de Reservas de Biblioteca</p>

                {/* Filtros */}
                <div className={styles.filterContainer}>
                    <button
                        className={`${styles.filterBtn} ${filter === 'todas' ? styles.active : ''}`}
                        onClick={() => setFilter('todas')}
                    >
                        Todas ({reservas.length})
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'activas' ? styles.active : ''}`}
                        onClick={() => setFilter('activas')}
                    >
                        Activas ({reservas.filter(r => r.estado === 'activa').length})
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'devueltas' ? styles.active : ''}`}
                        onClick={() => setFilter('devueltas')}
                    >
                        Devueltas ({reservas.filter(r => r.estado === 'devuelto').length})
                    </button>
                </div>

                {/* Tabla de reservas */}
                {loading ? (
                    <div className={styles.loading}>Cargando reservas...</div>
                ) : filteredReservas.length === 0 ? (
                    <div className={styles.empty}>No hay reservas para mostrar</div>
                ) : (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Libro</th>
                                    <th>Autor</th>
                                    <th>Fecha Reserva</th>
                                    <th>Estado</th>
                                    <th>Días Restantes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReservas.map((reserva) => {
                                    const daysRemaining = getDaysRemaining(reserva.created_at);
                                    const userName = reserva.usuario?.nombre || 'Usuario';
                                    const userEmail = reserva.usuario?.email || 'N/A';

                                    return (
                                        <tr key={reserva.id}>
                                            <td>{userName}</td>
                                            <td>{userEmail}</td>
                                            <td>{reserva.libros?.titulo || 'N/A'}</td>
                                            <td>{reserva.libros?.autor || 'N/A'}</td>
                                            <td>{new Date(reserva.created_at).toLocaleDateString('es-CL')}</td>
                                            <td>
                                                <span className={`${styles.badge} ${reserva.estado === 'activa' ? styles.badgeActive : styles.badgeReturned
                                                    }`}>
                                                    {reserva.estado === 'activa' ? 'Activa' : 'Devuelto'}
                                                </span>
                                            </td>
                                            <td>
                                                {reserva.estado === 'activa' ? (
                                                    <span
                                                        className={styles.daysRemaining}
                                                        style={{ color: getStatusColor(daysRemaining) }}
                                                    >
                                                        {daysRemaining > 0
                                                            ? `${daysRemaining} días`
                                                            : daysRemaining === 0
                                                                ? 'Hoy vence'
                                                                : `${Math.abs(daysRemaining)} días atrasado`
                                                        }
                                                    </span>
                                                ) : (
                                                    <span className={styles.returned}>
                                                        {reserva.fecha_devolucion
                                                            ? new Date(reserva.fecha_devolucion).toLocaleDateString('es-CL')
                                                            : 'Devuelto'
                                                        }
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
