'use client';

import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section
        className={styles.hero}
        style={{ backgroundImage: "url('/img/inicio.jpg')" }}
      >
        <div>
          <h1 className={styles.heroTitle}>
            BIENVENIDOS<br />
            IGLESIA TUPAHUE<br />
            REFORMADA
          </h1>
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
            {/* Video 1 - Servicio Dominical */}
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

            {/* Video 2 - El Credo */}
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

            {/* Video 3 - Estudio Bíblico */}
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
      <Footer />
    </div>
  );
}
