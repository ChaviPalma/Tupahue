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

            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                const errorText = await response.text();
                setResult({
                    error: `Error ${response.status}: ${response.statusText}`,
                    details: errorText || 'No hay detalles adicionales',
                    message: 'El API de recordatorios falló. Verifica que RESEND_API_KEY esté configurado en Vercel.'
                });
                return;
            }

            // Intentar parsear JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                setResult(data);
            } else {
                const text = await response.text();
                setResult({
                    error: 'Respuesta no es JSON',
                    details: text,
                    message: 'El API no devolvió una respuesta JSON válida'
                });
            }
        } catch (error) {
            setResult({
                error: error.message,
                message: 'Error al conectar con el API de recordatorios'
            });
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
