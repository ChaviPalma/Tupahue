# 🚨 SOLUCIÓN URGENTE - Error de Build en Vercel

## ❌ Problema Actual
```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
```

## ✅ Solución Inmediata

El build está fallando porque **falta la variable de entorno `RESEND_API_KEY` en Vercel**.

### Opción 1: Agregar la API Key de Resend (Recomendado si tienes cuenta)

1. Ve a https://resend.com/api-keys
2. Crea una API key (o usa una existente)
3. Cópiala
4. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
5. Click en **Settings** → **Environment Variables**
6. Agrega:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_xxxxxxxxxxxxx` (tu API key)
   - **Environments**: Marca **Production**, **Preview**, y **Development**
7. Click en **Save**
8. Ve a **Deployments** → Click en el último → **Redeploy**

### Opción 2: Deshabilitar temporalmente las funciones de email

Si NO tienes cuenta de Resend o quieres que el sitio funcione YA:

1. Ve a Vercel → **Settings** → **Environment Variables**
2. Agrega:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_dummy_key_for_build` (un valor dummy)
   - **Environments**: Marca todas
3. Click en **Save**
4. **Redeploy**

**NOTA**: Con la Opción 2, el sistema de emails NO funcionará, pero el resto del sitio (incluyendo el sistema de préstamos dinámico) funcionará perfectamente.

## 📋 Después del Build Exitoso

Una vez que el build pase, NO OLVIDES:

### 1. Agregar campo `paginas` en Supabase

```sql
ALTER TABLE libros 
ADD COLUMN IF NOT EXISTS paginas INTEGER DEFAULT 100;

UPDATE libros SET paginas = 150 WHERE paginas IS NULL;
```

### 2. Actualizar los libros con el número real de páginas

Ve a Supabase → Table Editor → libros → Edita cada libro

## 🎯 Variables de Entorno Necesarias en Vercel

Asegúrate de tener TODAS estas variables:

- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ `RESEND_API_KEY` ← **FALTA ESTA**
- ⚠️ `CRON_SECRET` (opcional, solo para cron jobs)

## 📞 Siguiente Paso

1. Agrega `RESEND_API_KEY` en Vercel (usa Opción 1 o 2)
2. Haz Redeploy
3. El build debería pasar ✅
4. Ejecuta el SQL en Supabase
5. ¡Listo! 🎉

---

**Última actualización**: 2025-12-20 17:35
