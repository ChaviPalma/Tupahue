# 📋 Instrucciones de Deployment - Sistema de Préstamos Dinámico

## ✅ Cambios Realizados

### 1. **Sistema de Préstamos Dinámico por Páginas**
- Libros con **menos de 100 páginas**: 7 días de préstamo
- Libros con **100 páginas o más**: 14 días de préstamo

### 2. **Fix de Build en Vercel**
- Se implementó "lazy initialization" de Resend para evitar errores durante el build
- Los archivos API ahora solo inicializan Resend cuando se ejecutan, no durante el build

## 🔧 Pasos para Completar el Deployment

### Paso 1: Agregar Campo `paginas` en Supabase ⚠️ **CRÍTICO**

1. Ve a tu dashboard de Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **SQL Editor** (menú lateral izquierdo)
4. Crea una nueva query y ejecuta:

```sql
-- Agregar columna 'paginas' a la tabla 'libros'
ALTER TABLE libros 
ADD COLUMN IF NOT EXISTS paginas INTEGER DEFAULT 100;

-- Actualizar libros existentes con valores por defecto
UPDATE libros SET paginas = 150 WHERE paginas IS NULL;
```

5. Click en **Run** (o presiona F5)

### Paso 2: Actualizar Datos de Libros

1. Ve a **Table Editor** → **libros**
2. Para cada libro, edita el campo `paginas` con el número real de páginas
3. Recuerda:
   - < 100 páginas = 7 días de préstamo
   - ≥ 100 páginas = 14 días de préstamo

### Paso 3: Forzar Deployment en Vercel (si es necesario)

Si Vercel no detecta automáticamente los cambios:

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto "tupahue"
3. Ve a la pestaña **Deployments**
4. Encuentra el deployment más reciente
5. Click en los **3 puntos** (⋮) → **Redeploy**
6. Selecciona **Redeploy** (sin usar caché si es necesario)

## 📝 Verificación

Una vez completados los pasos anteriores:

1. El build de Vercel debería completarse exitosamente ✅
2. Al reservar un libro, el mensaje mostrará los días correctos (7 o 14)
3. En "Mis Reservas", los días restantes se calcularán correctamente
4. Los emails de recordatorio usarán los días correctos

## 🐛 Troubleshooting

### Error: "Missing API key. Pass it to the constructor `new Resend("re_123")`"

**Solución**: Este error ya fue corregido con la lazy initialization. Si persiste:
- Verifica que estés desplegando el commit más reciente (74bf895 o posterior)
- Fuerza un redeploy en Vercel sin caché

### Error: "column 'paginas' does not exist"

**Solución**: Ejecuta el SQL del Paso 1 en Supabase

### Los días de préstamo no cambian

**Solución**: 
1. Verifica que el campo `paginas` existe en Supabase
2. Verifica que cada libro tiene un valor en el campo `paginas`
3. Limpia la caché del navegador (Ctrl + Shift + R)

## 📊 Commits Relevantes

- `74bf895`: Trigger Vercel deployment
- `42c3f05`: Fix lazy initialization de Resend + sistema dinámico por páginas
- `408cdf7`: Commit anterior (sistema con 14 días fijos)

## 🎯 Estado Actual

✅ Código actualizado y pusheado a GitHub (commit: 74bf895)
⏳ Esperando deployment en Vercel
⚠️ Falta agregar campo `paginas` en Supabase (CRÍTICO)

---

**Última actualización**: 2025-12-20 17:30
