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

            // Obtener datos del usuario
            const { data: usuario } = await supabaseClient
                .from('users')
                .select('email, raw_user_meta_data')
                .eq('id', reserva.user_id)
                .single();

            if (!libro || !usuario || !usuario.email) continue;

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
            let emailType = '';

            // Lógica de recordatorios: 3 días antes, 1 día antes, hoy, o atrasado
            if (diasRestantes === 3) {
                shouldSendEmail = true;
                emailType = '3 días';
            } else if (diasRestantes === 1) {
                shouldSendEmail = true;
                emailType = '1 día';
            } else if (diasRestantes === 0) {
                shouldSendEmail = true;
                emailType = 'hoy';
            } else if (diasRestantes < 0) {
                shouldSendEmail = true;
                emailType = 'atrasado';
            }

            if (shouldSendEmail) {
                const userName = usuario.raw_user_meta_data?.nombre || 'Usuario';
                const bookTitle = libro.titulo;
                const bookAuthor = libro.autor || '';

                let subject = '';
                let message = '';

                if (emailType === '3 días') {
                    subject = `Recordatorio: Devolver "${bookTitle}" en 3 días`;
                    message = `Hola ${userName},\n\nTe recordamos que tienes 3 días para devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\n¡Gracias por usar nuestra biblioteca!\n\nIglesia Reformada Tupahue`;
                } else if (emailType === '1 día') {
                    subject = `Urgente: Devolver "${bookTitle}" mañana`;
                    message = `Hola ${userName},\n\n⚠️ Te recordamos que mañana debes devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\n¡Gracias por usar nuestra biblioteca!\n\nIglesia Reformada Tupahue`;
                } else if (emailType === 'hoy') {
                    subject = `¡Hoy vence! Devolver "${bookTitle}"`;
                    message = `Hola ${userName},\n\n⏰ Hoy es el último día para devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\nPor favor, devuélvelo lo antes posible.\n\nIglesia Reformada Tupahue`;
                } else if (emailType === 'atrasado') {
                    const daysLate = Math.abs(diasRestantes);
                    subject = `Libro atrasado: "${bookTitle}" (${daysLate} días)`;
                    message = `Hola ${userName},\n\n❗ El libro "${bookTitle}" de ${bookAuthor} está atrasado por ${daysLate} día(s).\n\nFecha de devolución era: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\nPor favor, devuélvelo lo antes posible.\n\nIglesia Reformada Tupahue`;
                }

                try {
                    await getResend().emails.send({
                        from: 'Biblioteca Tupahue <onboarding@resend.dev>',
                        to: [usuario.email],
                        subject: subject,
                        text: message,
                    });

                    emailsSent.push({
                        email: usuario.email,
                        book: bookTitle,
                        type: emailType,
                        daysUntilDue: diasRestantes
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
