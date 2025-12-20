'use client';

import { useState } from 'react';
import styles from './test.module.css';

export default function TestEmail() {
    const [formData, setFormData] = useState({
        email: '',
        userName: 'Usuario de Prueba',
        bookTitle: 'El Peregrino',
        bookAuthor: 'John Bunyan',
        daysUntilDue: 0
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/test-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>🧪 Probar Email de Recordatorio</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Email (donde recibirás el correo de prueba)</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Nombre del Usuario</label>
                        <input
                            type="text"
                            value={formData.userName}
                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Título del Libro</label>
                        <input
                            type="text"
                            value={formData.bookTitle}
                            onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Autor del Libro</label>
                        <input
                            type="text"
                            value={formData.bookAuthor}
                            onChange={(e) => setFormData({ ...formData, bookAuthor: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Tipo de Recordatorio</label>
                        <select
                            value={formData.daysUntilDue}
                            onChange={(e) => setFormData({ ...formData, daysUntilDue: parseInt(e.target.value) })}
                        >
                            <option value="3">3 días antes (recordatorio amigable)</option>
                            <option value="1">1 día antes (urgente)</option>
                            <option value="0">Hoy vence (último día)</option>
                            <option value="-1">1 día atrasado</option>
                            <option value="-3">3 días atrasado</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : '📧 Enviar Email de Prueba'}
                    </button>
                </form>

                {result && (
                    <div className={result.error ? styles.error : styles.success}>
                        {result.error ? (
                            <>
                                <h3>❌ Error</h3>
                                <p>{result.error}</p>
                                {result.details && <pre>{JSON.stringify(result.details, null, 2)}</pre>}
                            </>
                        ) : (
                            <>
                                <h3>✅ Email Enviado</h3>
                                <p><strong>ID:</strong> {result.messageId}</p>
                                <div className={styles.preview}>
                                    <h4>Vista Previa:</h4>
                                    <p><strong>Asunto:</strong> {result.preview.subject}</p>
                                    <pre>{result.preview.message}</pre>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className={styles.info}>
                    <h3>ℹ️ Información</h3>
                    <p>Esta página te permite probar el sistema de emails sin necesidad de modificar la base de datos.</p>
                    <p><strong>Nota:</strong> Necesitas configurar la variable de entorno <code>RESEND_API_KEY</code> en tu archivo <code>.env.local</code></p>
                </div>
            </div>
        </div>
    );
}
