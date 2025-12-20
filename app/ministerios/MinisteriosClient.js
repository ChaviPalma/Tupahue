'use client';

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./ministerios.module.css";

export default function MinisteriosClient() {
    return (
        <div className={styles.pageContainer}>
            <Navbar />

            <section
                className={styles.hero}
                style={{ backgroundImage: "url('/img/ministerios.jpg')" }}
            >
            </section>

            <section className={styles.ministeriosSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Nuestros Ministerios</h2>
                    <p className={styles.sectionText}>
                        En la Iglesia Reformada Tupahue, creemos en el servicio y la comunidad.
                        Nuestros ministerios están diseñados para edificar, equipar y empoderar a cada miembro
                        de nuestra familia espiritual.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
