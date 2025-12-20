'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import styles from "./biblioteca.module.css";
import { getLibros, reservarLibro, getCurrentUser } from '@/lib/supabase';

export default function BibliotecaClient() {
    const router = useRouter();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [reservando, setReservando] = useState(null);

    // Cargar libros y usuario
    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setLoading(true);

        // Obtener usuario actual
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Obtener libros
        const { data, error } = await getLibros();
        if (!error && data) {
            setLibros(data);
        }

        setLoading(false);
    };

    const handleReservar = async (libroId) => {
        if (!user) {
            alert('Debes iniciar sesión para reservar un libro');
            router.push('/login');
            return;
        }

        setReservando(libroId);

        const { data, error } = await reservarLibro(libroId, user.id);

        if (error) {
            alert(error.message || 'Error al reservar el libro');
        } else {
            alert('¡Libro reservado exitosamente! Tienes 14 días para devolverlo.');
            // Recargar libros
            cargarDatos();
        }

        setReservando(null);
    };

    const categorias = [
        'Teología',
        'Apologética',
        'Ficción Cristiana',
        'Historia',
        'Devocionales',
        'Biografías'
    ];

    const librosFiltrados = categoriaSeleccionada
        ? libros.filter(libro => libro.categoria === categoriaSeleccionada)
        : libros;

    useEffect(() => {
        // Toggle navbar en móvil
        const navbarToggle = document.getElementById('navbarToggle');
        const navbarNav = document.getElementById('navbarNav');

        const handleToggle = () => {
            navbarNav?.classList.toggle('show');
        };

        navbarToggle?.addEventListener('click', handleToggle);

        return () => {
            navbarToggle?.removeEventListener('click', handleToggle);
        };
    }, []);

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
                    <button className={styles.navbarToggler} type="button" id="navbarToggle">
                        <span className={styles.navbarTogglerIcon}></span>
                    </button>
                    <div className={styles.navbarCollapse} id="navbarNav">
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
                                <Link className={`${styles.navLink} ${styles.active}`} href="/biblioteca">Biblioteca</Link>
                            </li>
                            <li className={styles.navItem}>
                                {user ? (
                                    <Link className={styles.btnLogin} href="/mis-reservas">
                                        <i className="bi bi-person-circle"></i> Mis Reservas
                                    </Link>
                                ) : (
                                    <Link className={styles.btnLogin} href="/login">Iniciar Sesión</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Contenedor principal */}
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Biblioteca</h1>

                {user && (
                    <div className={styles.welcomeMessage}>
                        <i className="bi bi-person-check"></i> Bienvenido, {user.user_metadata?.nombre || user.email}
                    </div>
                )}

                {/* Filtro de categorías */}
                <div className={styles.filtroContainer}>
                    <button
                        onClick={() => setCategoriaSeleccionada(null)}
                        className={`${styles.btnFilter} ${!categoriaSeleccionada ? styles.active : ''}`}
                    >
                        Todos
                    </button>
                    {categorias.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaSeleccionada(cat)}
                            className={`${styles.btnFilter} ${categoriaSeleccionada === cat ? styles.active : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Libros */}
                {loading ? (
                    <div className={styles.loadingMessage}>
                        <i className="bi bi-hourglass-split"></i> Cargando libros...
                    </div>
                ) : (
                    <div className={styles.booksGrid}>
                        {librosFiltrados.length > 0 ? (
                            librosFiltrados.map(libro => (
                                <div key={libro.id} className={styles.bookCard}>
                                    <div className={styles.cardImageContainer}>
                                        {libro.imagen_url ? (
                                            <Image
                                                src={libro.imagen_url}
                                                className={styles.cardImage}
                                                alt={libro.titulo}
                                                width={300}
                                                height={220}
                                            />
                                        ) : (
                                            <div className={styles.placeholderImage}>
                                                <i className="bi bi-book" style={{ fontSize: '3rem', color: '#999' }}></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.cardBody}>
                                        <h5 className={styles.cardTitle}>{libro.titulo}</h5>
                                        <p className={styles.cardText}>
                                            <strong>Autor:</strong> {libro.autor}
                                        </p>
                                        <p className={styles.cardText}>
                                            <strong>Categoría:</strong> {libro.categoria}
                                        </p>
                                        {libro.disponible ? (
                                            <button
                                                onClick={() => handleReservar(libro.id)}
                                                className={styles.btnPrimary}
                                                disabled={reservando === libro.id}
                                            >
                                                {reservando === libro.id ? (
                                                    <>
                                                        <i className="bi bi-hourglass-split"></i> Reservando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-bookmark-plus"></i> Reservar
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <span className={styles.badgeDanger}>
                                                <i className="bi bi-x-circle"></i> No disponible
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noBooks}>No hay libros disponibles en esta categoría.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Ubicación</h5>
                        <a
                            href="https://www.google.com/maps/dir//Deber+Cumplido+253,+Puerto+Montt,+Los+Lagos/"
                            className={styles.footerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Deber Cumplido 253, Puerto Montt, Los Lagos
                        </a>
                    </div>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Redes sociales</h5>
                        <div className={styles.socialLinks}>
                            <a
                                href="https://www.instagram.com/iglesiatupahue"
                                className={styles.footerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-instagram"></i> Instagram
                            </a>
                            <a
                                href="https://www.youtube.com/@iglesiareformadapuertomontt"
                                className={styles.footerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-youtube"></i> YouTube
                            </a>
                            <a
                                href="https://www.facebook.com/iglesiatupahue"
                                className={styles.footerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-facebook"></i> Facebook
                            </a>
                        </div>
                    </div>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Contáctanos</h5>
                        <a href="tel:+56956088059" className={styles.footerLink}>
                            <i className="bi bi-telephone"></i> +56 9 5608 8059
                        </a>
                    </div>
                </div>
                <hr className={styles.footerDivider} />
                <div className={styles.footerCopyright}>
                    <p>©️ Copyright 2025 | Todos los derechos Reservados. Iglesia Reformada Tupahue.</p>
                </div>
            </footer>
        </div>
    );
}
