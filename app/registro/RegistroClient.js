'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './registro.module.css';
import { signUp } from '@/lib/supabase';

export default function RegistroClient() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Por favor completa todos los campos');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await signUp(formData.email, formData.password, formData.nombre);

            if (error) {
                setError(error.message);
            } else {
                alert('¡Registro exitoso! Por favor revisa tu email para confirmar tu cuenta.');
                router.push('/login');
            }
        } catch (err) {
            setError('Error al registrar usuario');
        } finally {
            setLoading(false);
        }
    };

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
                    <div className={styles.navbarCollapse}>
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
                                <Link className={styles.navLink} href="/biblioteca">Biblioteca</Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link className={`${styles.btnLogin} ${styles.active}`} href="/login">Iniciar Sesión</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Registro Section */}
            <section className={styles.registroSection}>
                <div className={styles.container}>
                    <div className={styles.registroCard}>
                        <div className={styles.registroHeader}>
                            <div className={styles.logoContainer}>
                                <Image
                                    src="/img/LogoTupahue.png"
                                    alt="Logo Tupahue"
                                    width={100}
                                    height={100}
                                    className={styles.registroLogo}
                                />
                            </div>
                            <h2 className={styles.registroTitle}>Crear Cuenta</h2>
                            <p className={styles.registroSubtitle}>Únete a nuestra comunidad</p>
                        </div>

                        <form className={styles.registroForm} onSubmit={handleSubmit}>
                            {error && (
                                <div className={styles.errorMessage}>
                                    <i className="bi bi-exclamation-circle"></i> {error}
                                </div>
                            )}

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <i className="bi bi-person"></i> Nombre Completo
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className={styles.formInput}
                                    placeholder="Tu nombre completo"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <i className="bi bi-envelope"></i> Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className={styles.formInput}
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <i className="bi bi-lock"></i> Contraseña
                                </label>
                                <div className={styles.passwordContainer}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className={styles.formInput}
                                        placeholder="Mínimo 6 caracteres"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    <i className="bi bi-lock-fill"></i> Confirmar Contraseña
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    className={styles.formInput}
                                    placeholder="Repite tu contraseña"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <i className="bi bi-hourglass-split"></i> Registrando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-person-plus"></i> Crear Cuenta
                                    </>
                                )}
                            </button>
                        </form>

                        <div className={styles.registroFooter}>
                            <p>
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/login" className={styles.loginLink}>
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Contacto</h5>
                        <p>Email: contacto@tupahue.cl</p>
                        <p>Teléfono: +56 9 1234 5678</p>
                    </div>
                    <div className={styles.footerSection}>
                        <h5 className={styles.footerTitle}>Síguenos</h5>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.footerLink}><i className="bi bi-facebook"></i></a>
                            <a href="#" className={styles.footerLink}><i className="bi bi-instagram"></i></a>
                            <a href="#" className={styles.footerLink}><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <hr className={styles.footerDivider} />
                <div className={styles.footerCopyright}>
                    <p>&copy; 2024 Iglesia Reformada Tupahue. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
