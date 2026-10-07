# Sabor Criollo, demo de restaurante

Demo del portafolio de NEXA Soluciones Digitales: el sitio de un restaurante criollo y amazónico de Pucallpa.

## Stack

- Next.js 16 (App Router), React 19 y TypeScript
- Tailwind CSS 4
- Zod para validar en el navegador y en las rutas de API
- PostgreSQL como diseño (`db/schema.sql`), todavía sin conectar

## Páginas

- `/`: portada con reserva rápida, aviso de abierto o cerrado, carta por categorías, platos de la selva, eventos y reseñas
- `/menu`: la carta completa por secciones, con anclas (`#entradas`, `#de-la-selva`…)
- `/reservar`: formulario de reserva; recibe fecha, hora y personas desde la portada
- `/contacto`: datos, horario y formulario de contacto
- `/nosotros` y `/blog`
- `/admin`: panel del dueño (abierto en la demo, con datos de ejemplo)

## Rutas de API

- `POST /api/reservations`: valida la reserva con Zod y responde con la reserva creada
- `POST /api/contacto`: valida el mensaje
- `GET /api/menu`: la carta disponible

Ninguna ruta lista reservas ni mensajes, porque tendrían nombres y teléfonos de personas reales que prueban la demo. En producción eso le corresponde al panel, detrás de un inicio de sesión. `proxy.ts`, en la raíz del proyecto, limita cuántos formularios se pueden enviar por minuto desde una misma IP.

## Lógica con pruebas

- `lib/horario.ts`: horario de atención, si el local está abierto con la hora del Perú y el horario agrupado por días
- `lib/disponibilidad.ts`: turnos de reserva de cada día
- `lib/validation/`: esquemas de Zod y errores por campo
- `lib/utils/seguridad.ts`: qué imágenes se aceptan y limpieza de texto

Las pruebas están junto a cada archivo (`*.test.ts`) y se corren con `npm test` desde la raíz.

## Contacto

WhatsApp: +51 918 641 720
