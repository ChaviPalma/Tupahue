import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { reservaId } = await request.json();

        // Verificar autenticación
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }

        // Crear cliente admin
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );

        // Obtener la reserva
        const { data: reserva, error: reservaError } = await supabaseAdmin
            .from('reservas')
            .select('*, libros (titulo, autor)')
            .eq('id', reservaId)
            .single();

        if (reservaError) throw reservaError;

        // Obtener información del usuario
        const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(
            reserva.user_id
        );

        if (userError) throw userError;

        // Calcular días de atraso
        const created = new Date(reserva.created_at);
        const dueDate = new Date(created);
        dueDate.setDate(dueDate.getDate() + 14);
        const today = new Date();
        const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));

        // Enviar email (Forzado a Gmail para tus pruebas)
        const { data: emailData, error: emailError } = await resend.emails.send({
            from: 'Biblioteca Tupahue <onboarding@resend.dev>',
            to: ['barbarapalmamena@gmail.com'],
            subject: `⚠️ Recordatorio: Devolución de libro atrasada (${daysLate} días)`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc3545;">⚠️ Recordatorio de Devolución Atrasada</h2>
                    
                    <p>Hola ${user.user_metadata?.nombre || 'Usuario'},</p>
                    
                    <p>Te escribimos para recordarte que tienes un libro pendiente de devolución que está <strong style="color: #dc3545;">${daysLate} día${daysLate > 1 ? 's' : ''} atrasado</strong>.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">📚 Detalles del libro:</h3>
                        <p><strong>Título:</strong> ${reserva.libros.titulo}</p>
                        <p><strong>Autor:</strong> ${reserva.libros.autor}</p>
                        <p><strong>Fecha de reserva:</strong> ${new Date(reserva.created_at).toLocaleDateString('es-CL')}</p>
                        <p><strong>Fecha límite de devolución:</strong> ${dueDate.toLocaleDateString('es-CL')}</p>
                        <p style="color: #dc3545;"><strong>Días de atraso:</strong> ${daysLate} día${daysLate > 1 ? 's' : ''}</p>
                    </div>
                    
                    <p>Por favor, devuelve el libro lo antes posible para que otros miembros de la comunidad puedan disfrutarlo.</p>
                    
                    <p>Si ya devolviste el libro, por favor ignora este mensaje.</p>
                    
                    <p>Gracias por tu comprensión,<br>
                    <strong>Biblioteca Iglesia Tupahue</strong></p>
                </div>
            `
        });

        if (emailError) throw emailError;

        return Response.json({
            success: true,
            message: 'Email enviado correctamente'
        });

    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
