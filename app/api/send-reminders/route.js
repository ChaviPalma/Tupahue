import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
    try {
        // 1. Verificar variables de entorno
        if (!process.env.RESEND_API_KEY) {
            return Response.json({
                success: false,
                error: 'RESEND_API_KEY no está configurado'
            }, { status: 500 });
        }

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return Response.json({
                success: false,
                error: 'Variables de Supabase no están configuradas'
            }, { status: 500 });
        }

        // 2. Crear clientes
        const resend = new Resend(process.env.RESEND_API_KEY);
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // 3. Obtener reservas activas
        const { data: reservas, error: dbError } = await supabase
            .from('reservas')
            .select(`
                id,
                created_at,
                libro_id,
                user_id
            `)
            .eq('estado', 'activa');

        if (dbError) {
            return Response.json({
                success: false,
                error: 'Error al consultar reservas',
                details: dbError.message
            }, { status: 500 });
        }

        if (!reservas || reservas.length === 0) {
            return Response.json({
                success: true,
                message: 'No hay reservas activas',
                emailsSent: 0
            });
        }

        // 4. Para cada reserva, obtener datos del libro y usuario
        const emailsSent = [];
        const now = new Date();

        for (const reserva of reservas) {
            // Obtener libro
            const { data: libro } = await supabase
                .from('libros')
                .select('titulo, autor, paginas')
                .eq('id', reserva.libro_id)
                .single();

            // Obtener usuario
            const { data: usuario } = await supabase
                .from('users')
                .select('email, raw_user_meta_data')
                .eq('id', reserva.user_id)
                .single();

            if (!libro || !usuario || !usuario.email) continue;

            // Calcular días de préstamo
            const paginas = libro.paginas || 100;
            const diasPrestamo = paginas < 100 ? 3 : 14;

            // Calcular fecha de vencimiento
            const fechaReserva = new Date(reserva.created_at);
            const fechaVencimiento = new Date(fechaReserva);
            fechaVencimiento.setDate(fechaVencimiento.getDate() + diasPrestamo);

            // Calcular días restantes
            const diasRestantes = Math.ceil((fechaVencimiento - now) / (1000 * 60 * 60 * 24));

            // Decidir si enviar email
            let debeEnviar = false;
            let tipoEmail = '';

            if (diasRestantes === 3) {
                debeEnviar = true;
                tipoEmail = '3 días';
            } else if (diasRestantes === 1) {
                debeEnviar = true;
                tipoEmail = '1 día';
            } else if (diasRestantes === 0) {
                debeEnviar = true;
                tipoEmail = 'hoy';
            } else if (diasRestantes < 0) {
                debeEnviar = true;
                tipoEmail = 'atrasado';
            }

            if (debeEnviar) {
                const nombreUsuario = usuario.raw_user_meta_data?.nombre || 'Usuario';

                let subject = '';
                let message = '';

                if (tipoEmail === '3 días') {
                    subject = `Recordatorio: Devolver "${libro.titulo}" en 3 días`;
                    message = `Hola ${nombreUsuario},\n\nTe recordamos que tienes 3 días para devolver el libro "${libro.titulo}" de ${libro.autor}.\n\nFecha de devolución: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\n¡Gracias!\nBiblioteca Tupahue`;
                } else if (tipoEmail === '1 día') {
                    subject = `Urgente: Devolver "${libro.titulo}" mañana`;
                    message = `Hola ${nombreUsuario},\n\n⚠️ Mañana debes devolver el libro "${libro.titulo}" de ${libro.autor}.\n\nFecha de devolución: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\n¡Gracias!\nBiblioteca Tupahue`;
                } else if (tipoEmail === 'hoy') {
                    subject = `¡Hoy vence! "${libro.titulo}"`;
                    message = `Hola ${nombreUsuario},\n\n⏰ Hoy es el último día para devolver "${libro.titulo}" de ${libro.autor}.\n\nFecha de devolución: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\nBiblioteca Tupahue`;
                } else if (tipoEmail === 'atrasado') {
                    const diasAtraso = Math.abs(diasRestantes);
                    subject = `Libro atrasado: "${libro.titulo}"`;
                    message = `Hola ${nombreUsuario},\n\n❗ El libro "${libro.titulo}" está atrasado ${diasAtraso} día(s).\n\nFecha de devolución era: ${fechaVencimiento.toLocaleDateString('es-CL')}\n\nPor favor devuélvelo pronto.\nBiblioteca Tupahue`;
                }

                try {
                    await resend.emails.send({
                        from: 'Biblioteca Tupahue <onboarding@resend.dev>',
                        to: [usuario.email],
                        subject: subject,
                        text: message
                    });

                    emailsSent.push({
                        email: usuario.email,
                        libro: libro.titulo,
                        tipo: tipoEmail,
                        diasRestantes
                    });
                } catch (emailError) {
                    console.error('Error enviando email:', emailError);
                }
            }
        }

        return Response.json({
            success: true,
            message: `Proceso completado. ${emailsSent.length} emails enviados.`,
            emailsSent: emailsSent.length,
            detalles: emailsSent
        });

    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
