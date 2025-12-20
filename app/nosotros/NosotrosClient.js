'use client';

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./nosotros.module.css";

export default function NosotrosClient() {
    return (
        <div className={styles.pageContainer}>
            <Navbar />

            <section
                className={styles.hero}
                style={{ backgroundImage: "url('/img/nosotros.jpeg')" }}
            >
            </section>

            <section className={styles.misionVisionSection}>
                <div className={styles.container}>
                    <h1 className={styles.mainTitle}>Quiénes somos</h1>

                    <div className={styles.contentBox}>
                        <p className={styles.textMuted}>
                            Personas que expresan la misma fe, reciben el mismo señor, creen en su nombre y fueron
                            llamadas a hacer parte de una nueva familia donde están todos aquellos que hacen la voluntad
                            del Padre.<br />
                            Juan 1:12<br />
                            Mateo 12:50<br />
                            Una iglesia en la ciudad y una iglesia para la ciudad: somos parte de la familia de Dios en Puerto Montt.
                        </p>
                    </div>

                    <div className={styles.contentBox}>
                        <h5 className={styles.subtitle}>Visión</h5>
                        <p className={styles.textMuted}>
                            Ser una familia compuesta por discípulos diversos que orientan integralmente su vida de
                            acuerdo con el evangelio, buscando ser el verdadero Jesús conocido en Puerto Montt y
                            alrededor del mundo para la gloria de Dios.
                        </p>
                    </div>

                    <div className={styles.contentBox}>
                        <h5 className={styles.subtitle}>Misión</h5>
                        <p className={styles.textMuted}>
                            La iglesia existe para anunciar el evangelio en Puerto Montt y hasta el fin de la tierra,
                            haciendo un don a Dios en su propósito de tornar nuevas todas las cosas a través de la
                            persona y obra de Jesús.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
