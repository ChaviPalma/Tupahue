'use client';

import { useEffect } from 'react';
import Image from "next/image";
import styles from "./ministerios.module.css";

export default function MinisteriosClient() {
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

    // Datos de ministerios pastorales
    const familiasPastorales = [
        {
            id: 1,
            nombre: 'Familia Pastoral 1',
            descripcion: 'Descripción breve de la familia y su servicio en la iglesia.',
            imagen: '/img/familia1.jpg'
        },
        {
            id: 2,
            nombre: 'Familia Pastoral 2',
            descripcion: 'Descripción breve de la familia y su servicio en la iglesia.',
            imagen: '/img/familia2.jpg'
        },
        {
            id: 3,
            nombre: 'Familia Pastoral 3',
            descripcion: 'Descripción breve de la familia y su servicio en la iglesia.',
            imagen: '/img/familia3.jpg'
        }
    ];

    // Datos de otros ministerios
    const otrosMinisterios = [
        {
            id: 1,
            nombre: 'Ministerio de Matrimonios',
            descripcion: 'Un espacio de encuentro y crecimiento espiritual para los matrimonios.',
            encargado: 'Pr. Raul y Nena',
            icono: 'bi-heart'
        },
        {
            id: 2,
            nombre: 'Ministerio de Varones',
            descripcion: 'Formación bíblica y doctrinal para todas las edades.',
            encargado: 'Rafael Guaran',
            icono: 'bi-book'
        },
        {
            id: 3,
            nombre: 'Ministerio de Damas',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Nena',
            icono: 'bi-heart'
        },
        {
            id: 4,
            nombre: 'Ministerio de Jóvenes',
            descripcion: 'Formación bíblica y doctrinal para todas las edades.',
            encargado: 'Carlos y Maria Jesus',
            icono: 'bi-people'
        },
        {
            id: 5,
            nombre: 'Ministerio Infantil',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Nena',
            icono: 'bi-star'
        },
        {
            id: 6,
            nombre: 'Ministerio de Alabanza',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Pablo Cosque',
            icono: 'bi-music-note-beamed'
        },
        {
            id: 7,
            nombre: 'Ministerio de Misericordia',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Lolymar Padilla',
            icono: 'bi-heart-fill'
        },
        {
            id: 8,
            nombre: 'Ministerio de Hospitalidad',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Lolymar Padilla',
            icono: 'bi-house-heart'
        },
        {
            id: 9,
            nombre: 'Ministerio de Misiones y evangelismo',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Rodrigo Cardenas',
            icono: 'bi-globe'
        },
        {
            id: 10,
            nombre: 'Ministerio de Aseo',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Jocelin',
            icono: 'bi-droplet'
        },
        {
            id: 11,
            nombre: 'Ministerio de Biblioteca',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Carolina Santibañez',
            icono: 'bi-book-half'
        },
        {
            id: 12,
            nombre: 'Ministerio de Audiovisual',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Marcelo',
            icono: 'bi-camera-video'
        },
        {
            id: 13,
            nombre: 'Ministerio de Proyección',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Maria Jesus Ruíz',
            icono: 'bi-display'
        },
        {
            id: 14,
            nombre: 'Ministerio de Redes Sociales',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Kamila Guaran y Gabrielle Natal',
            icono: 'bi-share'
        },
        {
            id: 15,
            nombre: 'Ministerio de Tesoreria',
            descripcion: 'Ayuda social y apoyo comunitario, reflejando el amor de Cristo.',
            encargado: 'Susana Silva',
            icono: 'bi-cash-coin'
        }
    ];

    return (
        <div className={styles.pageContainer}>
            {/* Navbar */}
            <nav className={`${styles.navbar} ${styles.bgBlue}`}>
                <div className={styles.navbarContainer}>
                    <a href="/" className={styles.navbarBrand}>
                        <Image
                            src="/img/LogoTupahue.png"
                            className={styles.logoNavbar}
                            alt="Logo Iglesia Tupahue"
                            width={150}
                            height={150}
                            priority
                        />
                    </a>
                    <button className={styles.navbarToggler} type="button" id="navbarToggle">
                        <span className={styles.navbarTogglerIcon}></span>
                    </button>
                    <div className={styles.navbarCollapse} id="navbarNav">
                        <ul className={styles.navbarNav}>
                            <li className={styles.navItem}>
                                <a className={styles.navLink} href="/">Inicio</a>
                            </li>
                            <li className={styles.navItem}>
                                <a className={styles.navLink} href="/actividades">Actividades</a>
                            </li>
                            <li className={styles.navItem}>
                                <a className={styles.navLink} href="/nosotros">Nosotros</a>
                            </li>
                            <li className={styles.navItem}>
                                <a className={`${styles.navLink} ${styles.active}`} href="/ministerios">Ministerios</a>
                            </li>
                            <li className={styles.navItem}>
                                <a className={styles.navLink} href="/biblioteca">Biblioteca</a>
                            </li>
                            <li className={styles.navItem}>
                                <a className={styles.btnLogin} href="/login">Iniciar Sesión</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Banner */}
            <section
                className={styles.hero}
                style={{ backgroundImage: "url('/img/iglesia.jpg')" }}
            >
                <h1 className={styles.heroTitle}>Nuestros Ministerios</h1>
            </section>

            {/* Ministerio Pastoral */}
            <section className={styles.pastoralSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Ministerio Pastoral</h2>
                    <div className={styles.pastoralGrid}>
                        {familiasPastorales.map(familia => (
                            <div key={familia.id} className={styles.pastoralCard}>
                                <div className={styles.pastoralImageContainer}>
                                    <Image
                                        src={familia.imagen}
                                        alt={familia.nombre}
                                        width={400}
                                        height={350}
                                        className={styles.pastoralImage}
                                    />
                                </div>
                                <div className={styles.cardBody}>
                                    <h5 className={styles.cardTitle}>{familia.nombre}</h5>
                                    <p className={styles.cardText}>{familia.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Otros Ministerios */}
            <section className={styles.ministeriosSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Otros Ministerios</h2>
                    <div className={styles.ministeriosGrid}>
                        {otrosMinisterios.map(ministerio => (
                            <div key={ministerio.id} className={styles.ministerioCard}>
                                <div className={styles.cardBody}>
                                    <i className={`bi ${ministerio.icono} ${styles.ministerioIcon}`}></i>
                                    <h5 className={styles.cardTitle}>{ministerio.nombre}</h5>
                                    <p className={styles.cardText}>{ministerio.descripcion}</p>
                                    <div className={styles.encargado}>
                                        <p className={styles.encargadoNombre}>{ministerio.encargado}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                    <p>©️ Copyright 2024 | Todos los derechos Reservados. Iglesia Reformada Tupahue.</p>
                </div>
            </footer>
        </div>
    );
}
