import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Lazy initialization de Resend
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

// Lazy initialization de Supabase
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
        // Verificar autenticación (cron job o admin manual)
        const authHeader = request.headers.get('authorization');
        const isCronJob = authHeader === `Bearer ${process.env.CRON_SECRET}`;
        const isManualTest = authHeader && authHeader.startsWith('Bearer');

        if (!isCronJob && !isManualTest) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabaseClient = getSupabase();

        // Calcular fechas del mes anterior
        const now = new Date();
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // Obtener todas las reservas del mes anterior
        const { data: reservas, error: reservasError } = await supabaseClient
            .from('reservas')
            .select('*, libros (titulo, autor, categoria, paginas)')
            .gte('created_at', firstDayLastMonth.toISOString())
            .lte('created_at', lastDayLastMonth.toISOString())
            .order('created_at', { ascending: false });

        if (reservasError) {
            console.error('Error fetching reservas:', reservasError);
            return Response.json({ error: 'Error fetching reservas' }, { status: 500 });
        }

        // Calcular estadísticas
        const totalReservas = reservas.length;
        const reservasActivas = reservas.filter(r => r.estado === 'activa').length;
        const reservasDevueltas = reservas.filter(r => r.estado === 'devuelta').length;

        // Libros más prestados
        const librosPrestados = {};
        reservas.forEach(reserva => {
            const titulo = reserva.libros?.titulo || 'Desconocido';
            librosPrestados[titulo] = (librosPrestados[titulo] || 0) + 1;
        });

        const topLibros = Object.entries(librosPrestados)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([titulo, cantidad]) => ({ titulo, cantidad }));

        // Categorías más populares
        const categorias = {};
        reservas.forEach(reserva => {
            const categoria = reserva.libros?.categoria || 'Sin categoría';
            categorias[categoria] = (categorias[categoria] || 0) + 1;
        });

        const topCategorias = Object.entries(categorias)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([categoria, cantidad]) => ({ categoria, cantidad }));

        // Obtener usuarios únicos
        const usuariosUnicos = new Set(reservas.map(r => r.user_id)).size;

        // Nombre del mes anterior
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const nombreMes = meses[firstDayLastMonth.getMonth()];
        const año = firstDayLastMonth.getFullYear();

        // Generar HTML del reporte
        const topLibrosHTML = topLibros.map((libro, index) => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${libro.titulo}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${libro.cantidad}</td>
            </tr>
        `).join('');

        const topCategoriasHTML = topCategorias.map((cat, index) => `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${cat.categoria}</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${cat.cantidad}</td>
            </tr>
        `).join('');

        // Enviar datos a n8n para que maneje el envío de email
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

        if (!n8nWebhookUrl) {
            console.warn('N8N_WEBHOOK_URL no está configurado, saltando envío de email');
            return Response.json({
                success: true,
                message: 'Reporte generado (email no enviado - configurar N8N_WEBHOOK_URL)',
                stats: {
                    mes: `${nombreMes} ${año}`,
                    totalReservas,
                    usuariosUnicos,
                    reservasDevueltas,
                    reservasActivas,
                    topLibros,
                    topCategorias
                }
            });
        }

        // Preparar datos para n8n
        const reportData = {
            tipo: 'reporte_mensual',
            mes: nombreMes,
            año: año,
            fechaGeneracion: new Date().toLocaleDateString('es-CL'),
            estadisticas: {
                totalReservas,
                usuariosUnicos,
                reservasDevueltas,
                reservasActivas
            },
            topLibros,
            topCategorias,
            destinatarios: ['ba.palmam@duocuc.cl', 'barbarapalmamena@gmail.com']
        };

        // Enviar a n8n
        const n8nResponse = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData)
        });

        if (!n8nResponse.ok) {
            throw new Error(`Error al enviar a n8n: ${n8nResponse.statusText}`);
        }

        console.log('Datos enviados a n8n exitosamente');

        return Response.json({
            success: true,
            message: 'Reporte mensual enviado vía n8n',
            stats: {
                mes: `${nombreMes} ${año}`,
                totalReservas,
                usuariosUnicos,
                reservasDevueltas,
                reservasActivas,
                topLibros,
                topCategorias
            }
        });

    } catch (error) {
        console.error('Error in monthly-report:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
