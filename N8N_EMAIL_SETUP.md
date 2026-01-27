# Configuración de n8n para Emails de Biblioteca Tupahue

Este documento explica cómo configurar n8n para manejar el envío de emails del sistema de biblioteca.

## ¿Por qué n8n?

n8n permite:
- ✅ Enviar emails a cualquier destinatario sin restricciones
- ✅ Usar Gmail, Outlook, o cualquier servicio SMTP
- ✅ Personalizar completamente las plantillas de email
- ✅ Agregar más automatizaciones fácilmente

## Configuración en Vercel

Agrega esta variable de entorno en tu proyecto de Vercel:

```
N8N_WEBHOOK_URL=https://tu-instancia-n8n.com/webhook/biblioteca-reportes
```

## Flujo de n8n para Reportes Mensuales

### 1. Crear un nuevo Workflow en n8n

### 2. Agregar nodo "Webhook"
- **Método**: POST
- **Path**: `/biblioteca-reportes`
- **Responder**: Immediately

### 3. Agregar nodo "Gmail" (o tu servicio de email preferido)
- **Operación**: Send Email
- **To**: `{{ $json.destinatarios.join(',') }}`
- **Subject**: `📊 Reporte Mensual de Biblioteca - {{ $json.mes }} {{ $json.año }}`
- **Email Type**: HTML

### 4. Plantilla HTML para el email

```html
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #3c4d6b; border-bottom: 3px solid #3c4d6b; padding-bottom: 10px;">
        📚 Reporte Mensual de Biblioteca
    </h1>
    <h2 style="color: #666;">{{ $json.mes }} {{ $json.año }}</h2>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #3c4d6b;">📈 Resumen General</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px; font-weight: bold;">Total de préstamos:</td>
                <td style="padding: 10px; text-align: right; font-size: 24px; color: #3c4d6b;">
                    {{ $json.estadisticas.totalReservas }}
                </td>
            </tr>
            <tr style="background-color: white;">
                <td style="padding: 10px; font-weight: bold;">Usuarios únicos:</td>
                <td style="padding: 10px; text-align: right; font-size: 24px; color: #28a745;">
                    {{ $json.estadisticas.usuariosUnicos }}
                </td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold;">Libros devueltos:</td>
                <td style="padding: 10px; text-align: right; font-size: 24px; color: #28a745;">
                    {{ $json.estadisticas.reservasDevueltas }}
                </td>
            </tr>
            <tr style="background-color: white;">
                <td style="padding: 10px; font-weight: bold;">Préstamos activos:</td>
                <td style="padding: 10px; text-align: right; font-size: 24px; color: #ffc107;">
                    {{ $json.estadisticas.reservasActivas }}
                </td>
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
                {{#each $json.topLibros}}
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ @index + 1 }}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ titulo }}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">{{ cantidad }}</td>
                </tr>
                {{/each}}
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
                {{#each $json.topCategorias}}
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ @index + 1 }}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">{{ categoria }}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">{{ cantidad }}</td>
                </tr>
                {{/each}}
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
        <p>Reporte generado automáticamente el {{ $json.fechaGeneracion }}</p>
    </div>
</div>
```

## Datos que recibirá n8n

```json
{
  "tipo": "reporte_mensual",
  "mes": "Enero",
  "año": 2026,
  "fechaGeneracion": "26-01-2026",
  "estadisticas": {
    "totalReservas": 15,
    "usuariosUnicos": 8,
    "reservasDevueltas": 10,
    "reservasActivas": 5
  },
  "topLibros": [
    { "titulo": "Libro 1", "cantidad": 5 },
    { "titulo": "Libro 2", "cantidad": 3 }
  ],
  "topCategorias": [
    { "categoria": "Teología", "cantidad": 8 },
    { "categoria": "Historia", "cantidad": 4 }
  ],
  "destinatarios": [
    "ba.palmam@duocuc.cl",
    "barbarapalmamena@gmail.com"
  ]
}
```

## Alternativas a n8n

Si no quieres usar n8n, también puedes usar:
- **Zapier** (más fácil pero de pago)
- **Make** (antes Integromat)
- **Pipedream** (gratis y fácil)

## Pruebas

Una vez configurado:
1. Copia la URL del webhook de n8n
2. Agrégala como variable de entorno `N8N_WEBHOOK_URL` en Vercel
3. Haz clic en "📊 Generar Reporte Mensual" en el panel de admin
4. Revisa que llegue el email a ambos destinatarios
