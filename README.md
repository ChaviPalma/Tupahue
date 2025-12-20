# Proyecto Iglesia Tupahue - Next.js

## 📋 Resumen del Proyecto

Este proyecto es la conversión del sitio web de la Iglesia Reformada Tupahue de Django a Next.js.

---

## 🌐 Páginas Creadas

### ✅ 1. Página de Inicio (`/`)
- **Ubicación:** `app/page.js`
- **Características:**
  - Hero con imagen de fondo grande (800px)
  - Sección de Misión y Visión
  - Videos embebidos de YouTube (El Credo, Servicio Dominical, Estudio Bíblico)
  - Tarjetas de Encuentros (Miércoles y Domingo)
  - Sección de Instagram
  - Footer completo

### ✅ 2. Página de Actividades (`/actividades`)
- **Ubicación:** `app/actividades/page.js`
- **Características:**
  - Banner con imagen de fondo
  - Calendario de Google embebido
  - Navbar y Footer

### ✅ 3. Página de Biblioteca (`/biblioteca`)
- **Ubicación:** `app/biblioteca/page.js`
- **Características:**
  - Filtros de categorías interactivos
  - Tarjetas de libros con información
  - Botones de reserva
  - Datos de ejemplo incluidos

---

## 📁 Estructura de Archivos

```
tupahue/
├── app/
│   ├── actividades/
│   │   ├── page.js
│   │   ├── ActividadesClient.js
│   │   └── actividades.module.css
│   ├── biblioteca/
│   │   ├── page.js
│   │   ├── BibliotecaClient.js
│   │   └── biblioteca.module.css
│   ├── page.js                    ← Página de inicio
│   ├── page.module.css            ← Estilos de inicio
│   ├── layout.js                  ← Layout principal
│   ├── globals.css                ← Estilos globales
│   └── favicon.ico
├── public/
│   └── img/
│       ├── LogoTupahue.png
│       ├── inicio.jpg
│       ├── actividades.jpg
│       ├── oracion.jpeg
│       ├── servicio.jpeg
│       └── README.md
├── package.json
└── README.md
```

---

## 🎨 Tecnologías Utilizadas

- **Framework:** Next.js 16.1.0
- **Estilos:** CSS Modules
- **Fuentes:** 
  - Montserrat (página de inicio)
  - Roboto (otras páginas)
- **Iconos:** Bootstrap Icons
- **Videos:** YouTube embebido
- **Calendario:** Google Calendar embebido

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - Página principal: `http://localhost:3000`
   - Actividades: `http://localhost:3000/actividades`
   - Biblioteca: `http://localhost:3000/biblioteca`

---

## 📸 Imágenes Necesarias

Copia las siguientes imágenes desde tu proyecto Django a `public/img/`:

1. **LogoTupahue.png** - Logo del navbar
2. **inicio.jpg** - Hero de la página principal
3. **actividades.jpg** - Banner de actividades
4. **oracion.jpeg** - Tarjeta de reunión de oración
5. **servicio.jpeg** - Tarjeta de servicio dominical

**Ruta en Django:** `static/img/`
**Ruta en Next.js:** `public/img/`

---

## ✨ Características Implementadas

### Navbar
- ✅ Responsive (menú hamburguesa en móvil)
- ✅ Logo de la iglesia
- ✅ Enlaces a todas las páginas
- ✅ Botón de "Iniciar Sesión"
- ✅ Fixed (se mantiene arriba al hacer scroll)

### Footer
- ✅ Ubicación con enlace a Google Maps
- ✅ Redes sociales (Instagram, YouTube, Facebook)
- ✅ Teléfono de contacto
- ✅ Copyright

### Diseño
- ✅ Responsive (móvil, tablet, desktop)
- ✅ Efectos hover en tarjetas
- ✅ Transiciones suaves
- ✅ Colores corporativos (#3c4d6b, #3241BD)

---

## 🔄 Diferencias con Django

| Aspecto | Django | Next.js |
|---------|--------|---------|
| Templates | Jinja2 | JSX (JavaScript) |
| Archivos estáticos | `{% static %}` | `/public/` |
| Rutas | `urls.py` | Carpetas en `app/` |
| Estilos | CSS global | CSS Modules |
| Componentes | Templates | React Components |

---

## 📝 Próximos Pasos

### Páginas Pendientes:
- [ ] Nosotros (`/nosotros`)
- [ ] Ministerios (`/ministerios`)
- [ ] Login (`/login`)
- [ ] Reservar libro (`/reservar/[id]`)

### Funcionalidades Pendientes:
- [ ] Conectar con base de datos
- [ ] API para libros
- [ ] Sistema de autenticación
- [ ] Sistema de reservas
- [ ] Feed real de Instagram

---

## 🐛 Problemas Resueltos

1. **Error de CSS Modules:** Selectores globales (`*`) no permitidos en `.module.css`
   - **Solución:** Mover estilos globales a `globals.css`

2. **Error de metadata:** No se puede usar `'use client'` con `export const metadata`
   - **Solución:** Separar en componente de servidor y componente de cliente

---

## 📞 Contacto

**Iglesia Reformada Tupahue**
- 📍 Deber Cumplido 253, Puerto Montt, Los Lagos
- 📱 +56 9 5608 8059
- 📷 Instagram: @iglesiatupahue
- 🎥 YouTube: @iglesiareformadapuertomontt
- 👍 Facebook: @iglesiatupahue

---

## 📄 Licencia

©️ Copyright 2025 | Todos los derechos Reservados. Iglesia Reformada Tupahue.
