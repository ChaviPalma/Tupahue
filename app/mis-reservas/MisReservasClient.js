'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './mis-reservas.module.css';
import { getCurrentUser, getReservasUsuario, devolverLibro, signOut } from '@/lib/supabase';

export default function MisReservasClient() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [devolviendo, setDevolviendo] = useState(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);

        // Verificar si hay usuario logueado
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            router.push('/login');
            return;
        }

        setUser(currentUser);

        // Obtener reservas del usuario
        const { data, error } = await getReservasUsuario(currentUser.id);

        if (!error && data) {
            setReservas(data);
        }

        setLoading(false);
    };

    const handleDevolver = async (reservaId, libroId) => {
        if (!confirm('¿Estás seguro de que quieres devolver este libro?')) {
            return;
        }

        setDevolviendo(reservaId);

        const { error } = await devolverLibro(reservaId, libroId);

        if (error) {
            alert('Error al devolver el libro');
        } else {
            alert('¡Libro devuelto exitosamente!');
            cargarDatos();
        }

        setDevolviendo(null);
    };

    const handleCerrarSesion = async () => {
        await signOut();
        router.push('/');
    };

    const calcularDiasRestantes = (fechaReserva) => {
        const fecha = new Date(fechaReserva);
        const fechaDevolucion = new Date(fecha);
        fechaDevolucion.setDate(fecha.getDate() + 14); // 14 días para devolver

        const hoy = new Date();
        const diferencia = fechaDevolucion - hoy;
        const diasRestantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

        return {
            dias: diasRestantes,
            fechaDevolucion: fechaDevolucion.toLocaleDateString('es-CL')
        };
    };

    const reservasActivas = reservas.filter(r => r.estado === 'activa');
    const reservasDevueltas = reservas.filter(r => r.estado === 'devuelto');

    return (
        <div className={styles.pageContainer}>
            {/* Navbar */}
            <nav className={`${styles.navbar} ${styles.bgBlue}`}>
                <div className={styles.navbarContainer}>
                    <Link href="/" className={styles.navbarBrand}>
                        <Image
                            src="/img/LogoTupahue.png"
                            className={styles.logoNavbar}
                            alt="Logo Iglesia Tupahue"
                            width={150}
                            height={150}
                            priority
                        />
                    </Link>
                    <div className={styles.navbarCollapse}>
                        <ul className={styles.navbarNav}>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} href="/">Inicio</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} href="/actividades">Actividades</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} href="/nosotros">Nosotros</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} href="/ministerios">Ministerios</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={styles.navLink} href="/biblioteca">Biblioteca</Link>
                            </li>
                            <li className={styles.navItem}>
                                <button className={styles.btnLogout} onClick={handleCerrarSesion}>
                                    <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Contenedor principal */}
            <div className={styles.mainContainer}>
                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>
                        <i className="bi bi-bookmark-heart"></i> Mis Reservas
                    </h1>
                    {user && (
                        <p className={styles.userInfo}>
                            <i className="bi bi-person-circle"></i> {user.user_metadata?.nombre || user.email}
                        </p>
                    )}
                </div>

                {loading ? (
                    <div className={styles.loadingMessage}>
                        <i className="bi bi-hourglass-split"></i> Cargando reservas...
                    </div>
                ) : (
                    <>
                        {/* Reservas Activas */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <i className="bi bi-book"></i> Libros Prestados ({reservasActivas.length})
                            </h2>

                            {reservasActivas.length > 0 ? (
                                <div className={styles.reservasGrid}>
                                    {reservasActivas.map(reserva => {
                                        const { dias, fechaDevolucion } = calcularDiasRestantes(reserva.fecha_reserva);
                                        const esUrgente = dias <= 3;
                                        const estaAtrasado = dias < 0;

                                        return (
                                            <div key={reserva.id} className={`${styles.reservaCard} ${estaAtrasado ? styles.atrasado : ''}`}>
                                                <div className={styles.cardHeader}>
                                                    <h3 className={styles.libroTitulo}>{reserva.libros.titulo}</h3>
                                                    {estaAtrasado ? (
                                                        <span className={styles.badgeDanger}>
                                                            <i className="bi bi-exclamation-triangle"></i> Atrasado
                                                        </span>
                                                    ) : esUrgente ? (
                                                        <span className={styles.badgeWarning}>
                                                            <i className="bi bi-clock"></i> Urgente
                                                        </span>
                                                    ) : (
                                                        <span className={styles.badgeSuccess}>
                                                            <i className="bi bi-check-circle"></i> Activo
                                                        </span>
                                                    )}
                                                </div>

                                                <div className={styles.cardBody}>
                                                    <p className={styles.infoText}>
                                                        <i className="bi bi-person"></i> <strong>Autor:</strong> {reserva.libros.autor}
                                                    </p>
                                                    <p className={styles.infoText}>
                                                        <i className="bi bi-tag"></i> <strong>Categoría:</strong> {reserva.libros.categoria}
                                                    </p>
                                                    <p className={styles.infoText}>
                                                        <i className="bi bi-calendar-event"></i> <strong>Fecha de devolución:</strong> {fechaDevolucion}
                                                    </p>

                                                    <div className={`${styles.diasRestantes} ${estaAtrasado ? styles.atrasadoText : esUrgente ? styles.urgenteText : ''}`}>
                                                        <i className="bi bi-hourglass-split"></i>
                                                        {estaAtrasado ? (
                                                            <span>¡Debes devolver este libro! Lleva {Math.abs(dias)} días de retraso</span>
                                                        ) : dias === 0 ? (
                                                            <span>¡Debes devolver HOY!</span>
                                                        ) : dias === 1 ? (
                                                            <span>Queda 1 día para devolver</span>
                                                        ) : (
                                                            <span>Quedan {dias} días para devolver</span>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => handleDevolver(reserva.id, reserva.libro_id)}
                                                        className={styles.btnDevolver}
                                                        disabled={devolviendo === reserva.id}
                                                    >
                                                        {devolviendo === reserva.id ? (
                                                            <>
                                                                <i className="bi bi-hourglass-split"></i> Devolviendo...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="bi bi-check-circle"></i> Marcar como Devuelto
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <i className="bi bi-inbox"></i>
                                    <p>No tienes libros prestados actualmente</p>
                                    <Link href="/biblioteca" className={styles.btnPrimary}>
                                        <i className="bi bi-book"></i> Ir a la Biblioteca
                                    </Link>
                                </div>
                            )}
                        </section>

                        {/* Historial */}
                        {reservasDevueltas.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>
                                    <i className="bi bi-clock-history"></i> Historial ({reservasDevueltas.length})
                                </h2>

                                <div className={styles.historialList}>
                                    {reservasDevueltas.map(reserva => (
                                        <div key={reserva.id} className={styles.historialItem}>
                                            <div className={styles.historialInfo}>
                                                <h4>{reserva.libros.titulo}</h4>
                                                <p className={styles.historialMeta}>
                                                    <i className="bi bi-calendar-check"></i> Devuelto el{' '}
                                                    {new Date(reserva.fecha_devolucion).toLocaleDateString('es-CL')}
                                                </p>
                                            </div>
                                            <span className={styles.badgeDevuelto}>
                                                <i className="bi bi-check-circle-fill"></i> Devuelto
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Contacto</h5>
                        <p>Email: contacto@tupahue.cl</p>
                        <p>Teléfono: +56 9 1234 5678</p>
                    </div>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Síguenos</h5>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.footerLink}><i className="bi bi-facebook"></i></a>
                            <a href="#" className={styles.footerLink}><i className="bi bi-instagram"></i></a>
                            <a href="#" className={styles.footerLink}><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <hr className={styles.footerDivider} />
                <div className={styles.footerCopyright}>
                    <p>&copy; 2024 Iglesia Reformada Tupahue. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
