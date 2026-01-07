import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization de Resend para evitar errores durante el build
let resend = null;
const getResend = () => {
    if (!resend) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is not defined');
        }
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

// Lazy initialization de Supabase para evitar errores durante el build
let supabase = null;
const getSupabase = () => {
    if (!supabase) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Supabase URL or Service Role Key is missing');
        }

        supabase = createClient(supabaseUrl, supabaseServiceKey);
    }
    return supabase;
};

export async function GET(request) {
    try {
        // Verificar que la petición venga del cron job de Vercel
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseClient = getSupabase();

        // Obtener todas las reservas activas
        const { data: reservas, error: dbError } = await supabaseClient
            .from('reservas')
            .select(`
                id,
                created_at,
                libro_id,
                user_id
            `)
            .eq('estado', 'activa');

        if (dbError) {
            console.error('Error fetching reservas:', dbError);
            return Response.json({ error: 'Error fetching reservas' }, { status: 500 });
        }

        if (!reservas || reservas.length === 0) {
            return Response.json({ success: true, message: 'No hay reservas activas', emailsSent: 0 });
        }

        const now = new Date();
        const emailsSent = [];

        for (const reserva of reservas) {
            // Obtener datos del libro
            const { data: libro } = await supabaseClient
                .from('libros')
                .select('titulo, autor, paginas')
                .eq('id', reserva.libro_id)
                .single();

            // Obtener datos del usuario usando la API de Admin (más confiable)
            const { data: { user: usuario }, error: userError } = await supabaseClient.auth.admin.getUserById(
                reserva.user_id
            );

            if (!libro || userError || !usuario || !usuario.email) continue;

            // Calcular días de préstamo según páginas del libro (7 o 14 días)
            const paginas = libro.paginas || 100;
            const diasPrestamo = paginas < 100 ? 7 : 14;

            // Calcular fecha de vencimiento
            const fechaReserva = new Date(reserva.created_at);
            const fechaVencimiento = new Date(fechaReserva);
            fechaVencimiento.setDate(fechaVencimiento.getDate() + diasPrestamo);

            // Calcular días restantes
            const diasRestantes = Math.ceil((fechaVencimiento - now) / (1000 * 60 * 60 * 24));

            let shouldSendEmail = false;
            let isLate = diasRestantes < 0;
            let diffDays = Math.abs(diasRestantes);

            // Enviar recordatorio: 3 días antes, 1 día antes, hoy, o cada 3 días si está atrasado
            if (diasRestantes === 3 || diasRestantes === 1 || diasRestantes === 0) {
                shouldSendEmail = true;
            } else if (diasRestantes < 0 && diasRestantes % 3 === 0) {
                // Si está atrasado, enviar cada 3 días para no spamear tanto
                shouldSendEmail = true;
            }

            if (shouldSendEmail) {
                const userName = usuario.user_metadata?.nombre || 'Usuario';
                const bookTitle = libro.titulo;

                const subject = diasRestantes === 0
                    ? `⏰ ¡Hoy vence! Devolución de "${bookTitle}"`
                    : isLate
                        ? `⚠️ Libro atrasado: "${bookTitle}" (${diffDays} días)`
                        : `📚 Recordatorio: Devolución de "${bookTitle}" (${diasRestantes} días)`;

                const statusText = diasRestantes === 0
                    ? `<strong>vence hoy</strong>`
                    : isLate
                        ? `está <strong style="color: #dc3545;">${diffDays} día${diffDays > 1 ? 's' : ''} atrasado</strong>`
                        : `vence en <strong>${diasRestantes} día${diasRestantes > 1 ? 's' : ''}</strong> (el ${fechaVencimiento.toLocaleDateString('es-CL')})`;

                try {
                    await getResend().emails.send({
                        from: 'Biblioteca Tupahue <onboarding@resend.dev>',
                        to: [usuario.email],
                        subject: subject,
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: ${isLate || diasRestantes === 0 ? '#dc3545' : '#3c4d6b'};">
                                    ${isLate ? '⚠️ Recordatorio de Devolución Atrasada' : '📚 Recordatorio de Devolución'}
                                </h2>
                                
                                <p>Hola ${userName},</p>
                                
                                <p>Te escribimos para recordarte que tu préstamo del libro "${bookTitle}" ${statusText}.</p>
                                
                                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                    <h3 style="margin-top: 0;">📚 Detalles del libro:</h3>
                                    <p><strong>Título:</strong> ${bookTitle}</p>
                                    <p><strong>Autor:</strong> ${libro.autor || 'N/A'}</p>
                                    <p><strong>Fecha de reserva:</strong> ${new Date(reserva.created_at).toLocaleDateString('es-CL')}</p>
                                    <p><strong>Fecha límite de devolución:</strong> ${fechaVencimiento.toLocaleDateString('es-CL')}</p>
                                    ${isLate ? `<p style="color: #dc3545;"><strong>Días de atraso:</strong> ${diffDays} día${diffDays > 1 ? 's' : ''}</p>` : ''}
                                </div>
                                
                                <p>Por favor, devuelve el libro a tiempo para que otros miembros de la comunidad puedan disfrutarlo.</p>
                                
                                <p>Si ya devolviste el libro, por favor ignora este mensaje.</p>
                                
                                <p>Gracias por tu comprensión,<br>
                                <strong>Biblioteca Iglesia Tupahue</strong></p>
                            </div>
                        `
                    });

                    emailsSent.push({
                        email: usuario.email,
                        book: bookTitle,
                        daysRemaining: diasRestantes
                    });
                } catch (emailError) {
                    console.error('Error sending email:', emailError);
                }
            }
        }

        return Response.json({
            success: true,
            emailsSent: emailsSent.length,
            details: emailsSent
        });

    } catch (error) {
        console.error('Error in send-reminders:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
