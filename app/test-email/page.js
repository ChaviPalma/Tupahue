'use client';

import { useState } from 'react';
import styles from '../biblioteca/biblioteca.module.css';

export default function TestEmailPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleTestEmail = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/send-reminders', {
                method: 'POST',
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Probar Sistema de Recordatorios</h1>

                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ marginBottom: '2rem' }}>
                        Haz click en el botón para ejecutar manualmente el sistema de recordatorios por email.
                    </p>

                    <button
                        onClick={handleTestEmail}
                        disabled={loading}
                        className={styles.btnPrimary}
                        style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
                    >
                        {loading ? 'Enviando...' : 'Enviar Recordatorios Ahora'}
                    </button>

                    {result && (
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            backgroundColor: result.error ? '#f8d7da' : '#d1e7dd',
                            border: `1px solid ${result.error ? '#f5c2c7' : '#badbcc'}`,
                            borderRadius: '8px',
                            textAlign: 'left'
                        }}>
                            <h3 style={{ marginTop: 0 }}>Resultado:</h3>
                            <pre style={{
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                fontSize: '0.9rem'
                            }}>
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    )}

                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffecb5',
                        borderRadius: '8px'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>
                            <strong>Nota:</strong> Para que funcione, debes tener configurado RESEND_API_KEY en Vercel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
