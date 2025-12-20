'use client';

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./actividades.module.css";

export default function ActividadesClient() {
    return (
        <div className={styles.pageContainer}>
            {/* Navbar */}
            <Navbar />

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
            <Footer />
        </div>
    );
}
