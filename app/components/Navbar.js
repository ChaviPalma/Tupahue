'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar({ user, onLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Cerrar menú al cambiar de página
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
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

                <button
                    className={styles.navbarToggler}
                    type="button"
                    id="navbarToggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span className={styles.navbarTogglerIcon}></span>
                </button>

                <div
                    className={`${styles.navbarCollapse} ${isMenuOpen ? styles.show : ''}`}
                    id="navbarNav"
                >
                    <ul className={styles.navbarNav}>
                        <li className={styles.navItem}>
                            <Link
                                className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
                                href="/"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link
                                className={`${styles.navLink} ${pathname === '/actividades' ? styles.active : ''}`}
                                href="/actividades"
                            >
                                Actividades
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link
                                className={`${styles.navLink} ${pathname === '/nosotros' ? styles.active : ''}`}
                                href="/nosotros"
                            >
                                Nosotros
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link
                                className={`${styles.navLink} ${pathname === '/ministerios' ? styles.active : ''}`}
                                href="/ministerios"
                            >
                                Ministerios
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link
                                className={`${styles.navLink} ${pathname === '/biblioteca' ? styles.active : ''}`}
                                href="/biblioteca"
                            >
                                Biblioteca
                            </Link>
                        </li>
                        {user ? (
                            <>
                                <li className={styles.navItem}>
                                    <Link
                                        className={`${styles.navLink} ${pathname === '/mis-reservas' ? styles.active : ''}`}
                                        href="/mis-reservas"
                                    >
                                        Mis Reservas
                                    </Link>
                                </li>
                                <li className={styles.navItem}>
                                    <button
                                        className={styles.btnLogout}
                                        onClick={onLogout}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className={styles.navItem}>
                                <Link className={styles.btnLogin} href="/login">
                                    Iniciar Sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
