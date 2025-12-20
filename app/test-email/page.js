'use client';

import { useState } from 'react';

export default function TestEmailPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleTest = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/test-email', {
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
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Prueba de Sistema de Emails</h1>

            <button
                onClick={handleTest}
                disabled={loading}
                style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: '1rem'
                }}
            >
                {loading ? 'Enviando...' : 'Enviar Email de Prueba'}
            </button>

            {result && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: result.success ? '#d1e7dd' : '#f8d7da',
                    border: `1px solid ${result.success ? '#badbcc' : '#f5c2c7'}`,
                    borderRadius: '8px'
                }}>
                    <h3>{result.success ? '✅ Éxito' : '❌ Error'}</h3>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
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
                <h4>📋 Instrucciones:</h4>
                <ol>
                    <li>Crea una cuenta en <a href="https://resend.com" target="_blank">Resend.com</a></li>
                    <li>Obtén tu API Key del dashboard</li>
                    <li>Ve a Vercel → Settings → Environment Variables</li>
                    <li>Agrega: <code>RESEND_API_KEY</code> con tu API key</li>
                    <li>Redeploy el proyecto</li>
                    <li>Vuelve a esta página y haz clic en el botón</li>
                </ol>
            </div>
        </div>
    );
}
