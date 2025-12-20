import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { email, userName, bookTitle, bookAuthor, daysUntilDue } = await request.json();

        let subject = '';
        let message = '';
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + daysUntilDue);

        if (daysUntilDue === 3) {
            subject = `Recordatorio: Devolver "${bookTitle}" en 3 días`;
            message = `Hola ${userName},\n\nTe recordamos que tienes 3 días para devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${dueDate.toLocaleDateString('es-CL')}\n\n¡Gracias por usar nuestra biblioteca!\n\nIglesia Reformada Tupahue`;
        } else if (daysUntilDue === 1) {
            subject = `Urgente: Devolver "${bookTitle}" mañana`;
            message = `Hola ${userName},\n\n⚠️ Te recordamos que mañana debes devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${dueDate.toLocaleDateString('es-CL')}\n\n¡Gracias por usar nuestra biblioteca!\n\nIglesia Reformada Tupahue`;
        } else if (daysUntilDue === 0) {
            subject = `¡Hoy vence! Devolver "${bookTitle}"`;
            message = `Hola ${userName},\n\n⏰ Hoy es el último día para devolver el libro "${bookTitle}" de ${bookAuthor}.\n\nFecha de devolución: ${dueDate.toLocaleDateString('es-CL')}\n\nPor favor, devuélvelo lo antes posible.\n\nIglesia Reformada Tupahue`;
        } else if (daysUntilDue < 0) {
            const daysLate = Math.abs(daysUntilDue);
            subject = `Libro atrasado: "${bookTitle}" (${daysLate} días)`;
            message = `Hola ${userName},\n\n❗ El libro "${bookTitle}" de ${bookAuthor} está atrasado por ${daysLate} día(s).\n\nFecha de devolución era: ${dueDate.toLocaleDateString('es-CL')}\n\nPor favor, devuélvelo lo antes posible.\n\nIglesia Reformada Tupahue`;
        }

        const data = await resend.emails.send({
            from: 'Biblioteca Tupahue <onboarding@resend.dev>', // Usa el dominio de prueba de Resend
            to: [email],
            subject: subject,
            text: message,
        });

        return Response.json({
            success: true,
            messageId: data.id,
            preview: {
                subject,
                message
            }
        });

    } catch (error) {
        console.error('Error sending test email:', error);
        return Response.json({
            error: error.message,
            details: error
        }, { status: 500 });
    }
}
