# Sistema de Recordatorios de Biblioteca

## Configuración necesaria

Para que el sistema de recordatorios por email funcione, necesitas configurar las siguientes variables de entorno en Vercel:

### 1. Resend API Key

1. Ve a [resend.com](https://resend.com) y crea una cuenta
2. Verifica tu dominio (o usa el dominio de prueba que te dan)
3. Crea una API Key en el dashboard
4. Agrega en Vercel:
   - **Variable**: `RESEND_API_KEY`
   - **Valor**: Tu API key de Resend
   - **Environments**: Production, Preview, Development

### 2. Supabase Service Role Key

1. Ve a tu proyecto en Supabase
2. Settings → API
3. Copia el "service_role" key (NO el anon key)
4. Agrega en Vercel:
   - **Variable**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Valor**: Tu service role key
   - **Environments**: Production, Preview, Development

### 3. Cron Secret

1. Genera un string aleatorio seguro (puedes usar: `openssl rand -base64 32`)
2. Agrega en Vercel:
   - **Variable**: `CRON_SECRET`
   - **Valor**: Tu string aleatorio
   - **Environments**: Production, Preview, Development

## Cómo funciona

El sistema envía emails automáticamente:

- **3 días antes**: Recordatorio amigable
- **1 día antes**: Recordatorio urgente
- **Día del vencimiento**: Recordatorio final
- **Después del vencimiento**: Notificación de libro atrasado

El cron job se ejecuta **todos los días a las 9:00 AM** (hora de Chile).

## Configurar el dominio de email

Para enviar emails desde tu propio dominio (ej: biblioteca@tupahue.cl):

1. En Resend, ve a "Domains"
2. Agrega tu dominio
3. Configura los registros DNS que te indiquen
4. Espera la verificación
5. Actualiza el `from` en `/app/api/send-reminders/route.js`

## Probar manualmente

Para probar el envío de emails sin esperar al cron:

```bash
curl -X GET https://tupahue.vercel.app/api/send-reminders \
  -H "Authorization: Bearer TU_CRON_SECRET"
```

## Monitoreo

Puedes ver los logs del cron job en:
- Vercel Dashboard → Tu Proyecto → Cron Jobs
- Vercel Dashboard → Tu Proyecto → Logs
