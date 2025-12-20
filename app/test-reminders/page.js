'use client';

import { useState } from 'react';

export default function TestRemindersPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleTest = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/send-reminders', {
                method: 'POST'
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({
                success: false,
                error: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <h1>🔔 Sistema de Recordatorios</h1>
            <p>Esta página ejecuta el sistema de recordatorios que revisa todas las reservas activas y envía emails según los días restantes.</p>

            <button
                onClick={handleTest}
                disabled={loading}
                style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: loading ? '#ccc' : '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: '1rem'
                }}
            >
                {loading ? '⏳ Procesando...' : '▶️ Ejecutar Sistema de Recordatorios'}
            </button>

            {result && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: result.success ? '#d1e7dd' : '#f8d7da',
                    border: `2px solid ${result.success ? '#0f5132' : '#842029'}`,
                    borderRadius: '8px'
                }}>
                    <h3 style={{ marginTop: 0 }}>
                        {result.success ? '✅ Proceso Exitoso' : '❌ Error'}
                    </h3>

                    {result.success && (
                        <div>
                            <p><strong>Mensaje:</strong> {result.message}</p>
                            <p><strong>Emails enviados:</strong> {result.emailsSent}</p>

                            {result.detalles && result.detalles.length > 0 && (
                                <div>
                                    <h4>Detalles de emails enviados:</h4>
                                    <ul>
                                        {result.detalles.map((detalle, index) => (
                                            <li key={index}>
                                                <strong>{detalle.email}</strong> - {detalle.libro} ({detalle.tipo}) - {detalle.diasRestantes} días restantes
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    <details style={{ marginTop: '1rem' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Ver respuesta completa (JSON)</summary>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            backgroundColor: '#f5f5f5',
                            padding: '1rem',
                            borderRadius: '4px',
                            marginTop: '0.5rem'
                        }}>
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </details>
                </div>
            )}

            <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffecb5',
                borderRadius: '8px'
            }}>
                <h4>📋 Configuración requerida en Vercel:</h4>
                <ol>
                    <li><code>NEXT_PUBLIC_SUPABASE_URL</code></li>
                    <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                    <li><code>SUPABASE_SERVICE_ROLE_KEY</code> ⚠️ Importante</li>
                    <li><code>RESEND_API_KEY</code> (de <a href="https://resend.com" target="_blank">resend.com</a>)</li>
                </ol>

                <h4>📧 Cuándo se envían los emails:</h4>
                <ul>
                    <li>3 días antes del vencimiento</li>
                    <li>1 día antes del vencimiento</li>
                    <li>El día del vencimiento</li>
                    <li>Cuando está atrasado</li>
                </ul>
            </div>
        </div>
    );
}
