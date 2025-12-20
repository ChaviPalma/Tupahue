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

async function processReminders(isTest = false) {
    const supabaseClient = getSupabase();

    // Obtener todas las reservas activas
    const { data: reservas, error } = await supabaseClient
        .from('reservas')
        .select(`
            *,
            libros (titulo, autor, paginas),
            users:user_id (email, raw_user_meta_data)
        `)
        .eq('estado', 'activa');

    if (error) {
        console.error('Error fetching reservas:', error);
        throw new Error('Error fetching reservas');
    }

    const now = new Date();
    const emailsSent = [];

    for (const reserva of reservas) {
        const createdAt = new Date(reserva.created_at);
        const dueDate = new Date(createdAt);

        // Calcular días de préstamo según páginas del libro
        const paginas = reserva.libros?.paginas || 100;
        const diasPrestamo = paginas < 100 ? 3 : 14;
        dueDate.setDate(dueDate.getDate() + diasPrestamo);

        const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

        let shouldSendEmail = false;
        let emailType = '';

        // Determinar si enviar email según días restantes
        if (daysUntilDue === 3) {
            shouldSendEmail = true;
            emailType = '3 días';
        } else if (daysUntilDue === 1) {
            shouldSendEmail = true;
            emailType = '1 día';
        } else if (daysUntilDue === 0) {
            shouldSendEmail = true;
            emailType = 'hoy';
        } else if (daysUntilDue < 0) {
            shouldSendEmail = true;
            emailType = 'atrasado';
        }

        // Si es un test, forzamos el envío para la primera reserva que encontremos o similar
        // Pero por ahora mantengamos la lógica de días

        if (shouldSendEmail && reserva.users?.email) {
            const userName = reserva.users.raw_user_meta_data?.nombre || 'Usuario';
            const bookTitle = reserva.libros?.titulo || 'Libro';
            const bookAuthor = reserva.libros?.autor || '';

            let subject = '';
            let message = '';

            if (emailType === '3 días') {
                subject = `Recordatorio: Devolver "${bookTitle}" en 3 días`;
                message = `Hola ${userName},\n\nTe recordamos que tienes 3 días para devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${dueDate.toLocaleDateString('es-CL')}\n\n¡Gracias por usar nuestra biblioteca!\n\nIglesia Reformada Tupahue`;
            } else if (emailType === '1 día') {
                subject = `Urgente: Devolver "${bookTitle}" mañana`;
                message = `Hola ${userName},\n\n⚠️ Te recordamos que mañana debes devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${dueDate.toLocaleDateString('es-CL')}\n\n¡Gracias por usar nuestra biblioteca!\n\nIglesia Reformada Tupahue`;
            } else if (emailType === 'hoy') {
                subject = `¡Hoy vence! Devolver "${bookTitle}"`;
                message = `Hola ${userName},\n\n⏰ Hoy es el último día para devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${dueDate.toLocaleDateString('es-CL')}\n\nPor favor, devuélvelo lo antes posible.\n\nIglesia Reformada Tupahue`;
            } else if (emailType === 'atrasado') {
                const daysLate = Math.abs(daysUntilDue);
                subject = `Libro atrasado: "${bookTitle}" (${daysLate} días)`;
                message = `Hola ${userName},\n\n❗ El libro "${bookTitle}" de ${bookAuthor} está atrasado por ${daysLate} día(s).\n\nFecha de devolución era: ${dueDate.toLocaleDateString('es-CL')}\n\nPor favor, devuélvelo lo antes posible.\n\nIglesia Reformada Tupahue`;
            }

            try {
                await getResend().emails.send({
                    from: 'Biblioteca Tupahue <onboarding@resend.dev>', // Usar el dominio por defecto de Resend si no está verificado
                    to: [reserva.users.email],
                    subject: subject,
                    text: message,
                });

                emailsSent.push({
                    email: reserva.users.email,
                    book: bookTitle,
                    type: emailType,
                    daysUntilDue
                });
            } catch (emailError) {
                console.error('Error sending email:', emailError);
            }
        }
    }

    return emailsSent;
}

export async function GET(request) {
    try {
        // Verificar que la petición venga del cron job de Vercel
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const emailsSent = await processReminders();

        return Response.json({
            success: true,
            emailsSent: emailsSent.length,
            details: emailsSent
        });

    } catch (error) {
        console.error('Error in send-reminders GET:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        // Para el POST (test manual), no pedimos cron secret por ahora o pedimos otra validación
        // Pero para facilitar al usuario, lo dejamos abierto momentáneamente

        const emailsSent = await processReminders(true);

        return Response.json({
            success: true,
            emailsSent: emailsSent.length,
            details: emailsSent
        });

    } catch (error) {
        console.error('Error in send-reminders POST:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
