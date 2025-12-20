'use client';

import { useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
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
                <a className={`${styles.navLink} ${styles.active}`} href="/">Inicio</a>
              </li>
              <li className={styles.navItem}>
                <a className={styles.navLink} href="/actividades">Actividades</a>
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

      {/* Hero */}
      <section
        className={styles.hero}
        style={{ backgroundImage: "url('/img/inicio.jpg')" }}
      >
        <div>
          <h1 className={styles.heroTitle}>Bienvenidos a Iglesia Reformada Tupahue</h1>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className={`${styles.misionVision} ${styles.bgBlue}`}>
        <div className={styles.container}>
          <h2 className={styles.misionText}>
            Somos una iglesia formada por personas que expresan la misma fe, reciben el mismo Señor,
            creen en su nombre y fueron llamados a ser parte de una nueva familia donde están todos
            aquellos que hacen la voluntad del Padre.
          </h2>
        </div>
      </section>

      {/* Videos */}
      <section className={styles.videosSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <div className={styles.videosGrid}>
            {/* Video 1 */}
            <div className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <iframe
                  src="https://www.youtube.com/embed/jMQa-1Gk3a4?si=EN8szu3jncPMrSAL"
                  allowFullScreen
                  title="El credo"
                />
              </div>
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>El credo</h5>
              </div>
            </div>

            {/* Video 2 */}
            <div className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLmShX6jrCSweWQtT-WZp5OwIjjP_hFKh6"
                  allowFullScreen
                  title="Servicio Dominical"
                />
              </div>
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Servicio Dominical</h5>
              </div>
            </div>

            {/* Video 3 */}
            <div className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLmShX6jrCSwcOTbXLuwmtWHJdXPLnXI_k"
                  allowFullScreen
                  title="Estudio Bíblico"
                />
              </div>
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>Estudio Bíblico</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Encuentros */}
      <section className={styles.encuentrosSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Encuentros</h2>
          <div className={styles.encuentrosGrid}>
            {/* Encuentro 1 */}
            <div className={styles.encuentroCard}>
              <div className={styles.encuentroImageContainer}>
                <Image
                  src="/img/oracion.jpeg"
                  alt="Reunión de Oración"
                  width={400}
                  height={300}
                  className={styles.encuentroImage}
                />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>Miércoles</p>
                <p className={styles.cardText}>19h30</p>
              </div>
            </div>

            {/* Encuentro 2 */}
            <div className={styles.encuentroCard}>
              <div className={styles.encuentroImageContainer}>
                <Image
                  src="/img/servicio.jpeg"
                  alt="Servicio Dominical"
                  width={400}
                  height={300}
                  className={styles.encuentroImage}
                />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>Domingo</p>
                <p className={styles.cardText}>Escuela Bíblica 10h30</p>
                <p className={styles.cardText}>Servicio 11h20</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feed de Instagram */}
      <section className={styles.instagramSection}>
        <div className={styles.instagramContainer}>
          <div className={styles.instagramPlaceholder}>
            <i className="bi bi-instagram" style={{ fontSize: '3rem', color: '#E4405F' }}></i>
            <p className={styles.instagramText}>Síguenos en Instagram @iglesiatupahue</p>
            <a
              href="https://www.instagram.com/iglesiatupahue"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramButton}
            >
              Ver en Instagram
            </a>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

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
