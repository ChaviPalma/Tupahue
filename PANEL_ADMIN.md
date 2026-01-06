# 👨‍💼 Panel de Administración - Sistema de Biblioteca

## ¿Qué es?

El panel de administración te permite ver y gestionar todas las reservas de libros de la biblioteca. Solo usuarios con rol de administrador pueden acceder.

## 🔐 Cómo acceder

### Opción 1: Email específico (Recomendado)
El sistema reconoce automáticamente como admin a:
- **Email**: `admin@tupahue.cl`

### Opción 2: Configurar admin en Supabase
1. Ve a tu proyecto en Supabase
2. Ve a **Authentication** → **Users**
3. Encuentra tu usuario
4. Click en los 3 puntos (⋯) → **Edit user**
5. En **User Metadata** agrega:
   ```json
   {
     "role": "admin"
   }
   ```
6. Guarda los cambios

## 📊 Funcionalidades

### Vista de Reservas
- **Todas**: Muestra todas las reservas (activas y devueltas)
- **Activas**: Solo reservas que aún no se han devuelto
- **Devueltas**: Reservas ya devueltas

### Información mostrada
- Nombre del usuario
- Email del usuario
- Título del libro
- Autor del libro
- Fecha de reserva
- Estado (Activa/Devuelto)
- Días restantes o fecha de devolución

### Indicadores de color
- 🟢 **Verde**: Más de 3 días restantes
- 🟡 **Amarillo**: 3 días o menos para vencer
- 🔴 **Rojo**: Reserva atrasada

## 🚀 Cómo usar

1. **Inicia sesión** con tu cuenta de administrador
2. **Accede al panel**: `tupahue.vercel.app/admin`
3. **Filtra las reservas** según necesites
4. **Revisa la información** de cada reserva

## 🔒 Seguridad

- Solo usuarios autenticados pueden intentar acceder
- Solo usuarios con rol de admin pueden ver el panel
- Usuarios normales son redirigidos automáticamente
- La ruta está protegida en el servidor

## 📱 Responsive

El panel funciona perfectamente en:
- 💻 Desktop
- 📱 Tablet
- 📱 Móvil (con scroll horizontal en la tabla)

## 🛠️ Mantenimiento

### Agregar más admins
Simplemente agrega el metadata `{"role": "admin"}` a cualquier usuario en Supabase.

### Cambiar el email admin por defecto
Edita el archivo `app/admin/page.js` línea 21:
```javascript
const isAdmin = currentUser.email === 'TU_EMAIL@AQUI.cl' || 
               currentUser.user_metadata?.role === 'admin';
```

## 📧 Integración con Emails

El panel muestra los mismos datos que se usan para enviar recordatorios automáticos:
- Días restantes para devolución
- Estado de la reserva
- Información del usuario

## 🎨 Personalización

Los estilos están en `app/admin/admin.module.css` y puedes modificar:
- Colores del tema
- Tamaños de fuente
- Espaciado
- Diseño responsive
