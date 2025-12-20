'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

    const handleReservar = async (libro) => {
        if (!user) {
            alert('Debes iniciar sesión para reservar un libro');
            router.push('/login');
            return;
        }

        setReservando(libro.id);

        const { data, error } = await reservarLibro(libro.id, user.id);

        if (error) {
            alert(error.message || 'Error al reservar el libro');
        } else {
            // Calcular días de préstamo según páginas
            const diasPrestamo = libro.paginas < 100 ? 3 : 14;
            alert(`¡Libro reservado exitosamente! Tienes ${diasPrestamo} días para devolverlo.`);
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



    return (
        <div className={styles.pageContainer}>
            {/* Navbar */}
            <Navbar user={user} />

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
                                        {libro.paginas && (
                                            <p className={styles.cardText}>
                                                <strong>Páginas:</strong> {libro.paginas}
                                            </p>
                                        )}
                                        {libro.disponible && libro.paginas && (
                                            <p className={styles.cardText}>
                                                <strong>Préstamo:</strong> {libro.paginas < 100 ? '3 días' : '14 días'}
                                            </p>
                                        )}
                                        {libro.disponible ? (
                                            <button
                                                onClick={() => handleReservar(libro)}
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
            <Footer />
        </div>
    );
}
