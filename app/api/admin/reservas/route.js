import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
    try {
        // Verificar que el usuario esté autenticado
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }

        // Crear cliente con service role para acceder a auth.users
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

        // Obtener todas las reservas con información de libros
        const { data: reservas, error: reservasError } = await supabaseAdmin
            .from('reservas')
            .select('*, libros (titulo, autor, categoria)')
            .order('created_at', { ascending: false });

        if (reservasError) throw reservasError;

        // Obtener información de usuarios para cada reserva
        const reservasConUsuarios = await Promise.all(
            reservas.map(async (reserva) => {
                const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(
                    reserva.user_id
                );

                return {
                    ...reserva,
                    usuario: {
                        nombre: user?.user_metadata?.nombre || 'Usuario',
                        email: user?.email || 'N/A'
                    }
                };
            })
        );

        return Response.json({ data: reservasConUsuarios });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
