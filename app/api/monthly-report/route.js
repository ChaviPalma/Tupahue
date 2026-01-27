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

        // Enviar email al administrador (solo al email verificado en Resend)
        const adminEmail = 'ba.palmam@duocuc.cl';

        const emailResult = await getResend().emails.send({
            from: 'Biblioteca Tupahue <onboarding@resend.dev>',
            to: adminEmail,
            subject: `📊 Reporte Mensual de Biblioteca - ${nombreMes} ${año}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #3c4d6b; border-bottom: 3px solid #3c4d6b; padding-bottom: 10px;">
                        📚 Reporte Mensual de Biblioteca
                    </h1>
                    <h2 style="color: #666;">${nombreMes} ${año}</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #3c4d6b;">📈 Resumen General</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; font-weight: bold;">Total de préstamos:</td>
                                <td style="padding: 10px; text-align: right; font-size: 24px; color: #3c4d6b;">${totalReservas}</td>
                            </tr>
                            <tr style="background-color: white;">
                                <td style="padding: 10px; font-weight: bold;">Usuarios únicos:</td>
                                <td style="padding: 10px; text-align: right; font-size: 24px; color: #28a745;">${usuariosUnicos}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; font-weight: bold;">Libros devueltos:</td>
                                <td style="padding: 10px; text-align: right; font-size: 24px; color: #28a745;">${reservasDevueltas}</td>
                            </tr>
                            <tr style="background-color: white;">
                                <td style="padding: 10px; font-weight: bold;">Préstamos activos:</td>
                                <td style="padding: 10px; text-align: right; font-size: 24px; color: #ffc107;">${reservasActivas}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="margin: 30px 0;">
                        <h3 style="color: #3c4d6b;">🏆 Top 5 Libros Más Prestados</h3>
                        <table style="width: 100%; border-collapse: collapse; background-color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <thead>
                                <tr style="background-color: #3c4d6b; color: white;">
                                    <th style="padding: 12px; text-align: left; width: 50px;">#</th>
                                    <th style="padding: 12px; text-align: left;">Título</th>
                                    <th style="padding: 12px; text-align: center; width: 100px;">Préstamos</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${topLibrosHTML || '<tr><td colspan="3" style="padding: 20px; text-align: center; color: #999;">No hay datos</td></tr>'}
                            </tbody>
                        </table>
                    </div>

                    <div style="margin: 30px 0;">
                        <h3 style="color: #3c4d6b;">📚 Categorías Más Populares</h3>
                        <table style="width: 100%; border-collapse: collapse; background-color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <thead>
                                <tr style="background-color: #3c4d6b; color: white;">
                                    <th style="padding: 12px; text-align: left; width: 50px;">#</th>
                                    <th style="padding: 12px; text-align: left;">Categoría</th>
                                    <th style="padding: 12px; text-align: center; width: 100px;">Préstamos</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${topCategoriasHTML || '<tr><td colspan="3" style="padding: 20px; text-align: center; color: #999;">No hay datos</td></tr>'}
                            </tbody>
                        </table>
                    </div>

                    <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin-top: 30px;">
                        <p style="margin: 0; color: #666; font-size: 14px;">
                            <strong>Nota:</strong> Este reporte se genera automáticamente el primer día de cada mes.
                            Para más detalles, accede al panel de administración.
                        </p>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
                        <p>Biblioteca Iglesia Reformada Tupahue</p>
                        <p>Reporte generado automáticamente el ${new Date().toLocaleDateString('es-CL')}</p>
                    </div>
                </div>
            `
        });

        console.log('Email send result:', emailResult);

        return Response.json({
            success: true,
            message: 'Reporte mensual enviado',
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
