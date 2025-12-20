# 🧪 Cómo Probar el Sistema de Emails

## Paso 1: Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com/signup)
2. Crea una cuenta gratuita
3. Una vez dentro, ve a **API Keys**
4. Click en **Create API Key**
5. Dale un nombre (ej: "Tupahue Development")
6. Copia la API Key que te dan

## Paso 2: Configurar la API Key localmente

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Agrega esta línea al final:
   ```
   RESEND_API_KEY=re_tu_api_key_aqui
   ```
3. Guarda el archivo

## Paso 3: Reiniciar el servidor

1. Detén el servidor si está corriendo (Ctrl+C en la terminal)
2. Vuelve a iniciar con:
   ```
   npm run dev
   ```

## Paso 4: Probar el envío de emails

1. Abre tu navegador y ve a: `http://localhost:3000/test-email`
2. Ingresa tu email (donde quieres recibir el correo de prueba)
3. Selecciona el tipo de recordatorio (ej: "Hoy vence")
4. Click en **"📧 Enviar Email de Prueba"**
5. Revisa tu bandeja de entrada (puede tardar 1-2 minutos)

## Notas Importantes

- **Dominio de prueba**: Por defecto, los emails se envían desde `onboarding@resend.dev`
- **Límite gratuito**: Resend te da 100 emails/día gratis (suficiente para pruebas)
- **Spam**: Los emails de prueba pueden llegar a spam, revisa esa carpeta

## Para Producción (Vercel)

Una vez que funcione localmente, agrega la misma variable en Vercel:

1. Ve a [vercel.com](https://vercel.com)
2. Tu proyecto → **Settings** → **Environment Variables**
3. Agrega:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Tu API key de Resend
   - **Environments**: Production, Preview, Development
4. Redeploy el proyecto

## Configurar tu propio dominio (Opcional)

Para enviar emails desde `biblioteca@tupahue.cl`:

1. En Resend, ve a **Domains**
2. Click en **Add Domain**
3. Ingresa `tupahue.cl`
4. Sigue las instrucciones para configurar los registros DNS
5. Una vez verificado, actualiza el `from` en `/app/api/test-email/route.js` y `/app/api/send-reminders/route.js`

## Solución de Problemas

### Error: "Missing API key"
- Verifica que agregaste `RESEND_API_KEY` en `.env.local`
- Reinicia el servidor después de agregar la variable

### No recibo el email
- Revisa la carpeta de spam
- Verifica que el email ingresado sea correcto
- Revisa los logs en la consola del navegador (F12)

### Error 500
- Verifica que la API key sea válida
- Revisa los logs del servidor en la terminal
