'use client';

import { useEffect } from 'react';
import Image from "next/image";
import styles from "./actividades.module.css";

export default function ActividadesClient() {
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
                                <a className={`${styles.navLink} ${styles.active}`} href="/actividades">Actividades</a>
                            </li>
                            <li className={styles.navItem}>
                                <a className={styles.navLink} href="/nosotros">Nosotros</a>
                            </li>
                            <li className={styles.navItem}>
                                <a className={styles.navLink} href="/ministerios">Ministerios</a>
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
                style={{ backgroundImage: "url('/img/actividades.jpg')" }}
            >
            </section>

            {/* Calendario */}
            <section className={styles.calendarSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Calendario de Actividades</h2>
                    <div className={styles.calendarContainer}>
                        <iframe
                            src="https://calendar.google.com/calendar/embed?src=ba7249f69ca9a39de99e42f3bc2c10a821a7fcea9b6fb4666295419588eb0506%40group.calendar.google.com&ctz=America%2FSantiago&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showDate=0"
                            className={styles.calendarIframe}
                            frameBorder="0"
                            scrolling="no"
                            title="Calendario de Actividades"
                        />
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
