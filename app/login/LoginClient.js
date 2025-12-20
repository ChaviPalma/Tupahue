'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './login.module.css';
import { signIn, getCurrentUser } from '@/lib/supabase';

export default function LoginClient() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        // Verificar si ya hay un usuario logueado
        const checkUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                router.push('/biblioteca');
            }
        };
        checkUser();
    }, [router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Por favor completa todos los campos');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await signIn(formData.email, formData.password);

            if (error) {
                setError('Email o contraseña incorrectos');
            } else {
                // Redirigir a biblioteca
                router.push('/biblioteca');
            }
        } catch (err) {
            setError('Error al iniciar sesión');
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

            {/* Login Section */}
            <section className={styles.loginSection}>
                <div className={styles.container}>
                    <div className={styles.loginCard}>
                        <div className={styles.loginHeader}>
                            <div className={styles.logoContainer}>
                                <Image
                                    src="/img/LogoTupahue.png"
                                    alt="Logo Tupahue"
                                    width={100}
                                    height={100}
                                    className={styles.loginLogo}
                                />
                            </div>
                            <h2 className={styles.loginTitle}>Bienvenido</h2>
                            <p className={styles.loginSubtitle}>Inicia sesión en tu cuenta</p>
                        </div>

                        <form className={styles.loginForm} onSubmit={handleSubmit}>
                            {error && (
                                <div className={styles.errorMessage}>
                                    <i className="bi bi-exclamation-circle"></i> {error}
                                </div>
                            )}

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
                                        placeholder="Tu contraseña"
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

                            <div className={styles.formOptions}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    Recordarme
                                </label>
                                <a href="#" className={styles.forgotPassword}>
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <i className="bi bi-hourglass-split"></i> Iniciando sesión...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                                    </>
                                )}
                            </button>
                        </form>

                        <div className={styles.loginFooter}>
                            <p>
                                ¿No tienes cuenta?{' '}
                                <Link href="/registro" className={styles.registerLink}>
                                    Regístrate aquí
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
