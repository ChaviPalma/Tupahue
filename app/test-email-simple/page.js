'use client';

import { useState } from 'react';
import styles from '../biblioteca/biblioteca.module.css';

export default function TestEmailSimplePage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleTestEmail = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/test-email', {
                method: 'POST',
            });

            const text = await response.text();

            try {
                const data = JSON.parse(text);
                setResult(data);
            } catch {
                setResult({
                    status: response.status,
                    statusText: response.statusText,
                    rawResponse: text,
                    message: 'La respuesta no es JSON válido'
                });
            }
        } catch (error) {
            setResult({
                error: error.message,
                message: 'Error al conectar con el API'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.mainContainer}>
                <h1 className={styles.pageTitle}>Prueba de Email Simple</h1>

                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p style={{ marginBottom: '2rem' }}>
                        Esta página envía un email de prueba simple.
                    </p>

                    <button
                        onClick={handleTestEmail}
                        disabled={loading}
                        className={styles.btnPrimary}
                        style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
                    >
                        {loading ? 'Enviando...' : 'Enviar Email de Prueba'}
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
                            <strong>Nota:</strong> Necesitas configurar RESEND_API_KEY en Vercel.
                        </p>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                            Si ves un error, verifica que la variable esté configurada y que Vercel haya desplegado los últimos cambios.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
