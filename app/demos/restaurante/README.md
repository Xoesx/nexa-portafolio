# Sabor Criollo — Demo de restaurante

Demo de portafolio de NEXA Soluciones Digitales.

## Stack
- HTML5, CSS3 (Tailwind), TypeScript, React 19, Next.js 15
- API Routes de Next.js, Node.js
- Validación con Zod
- PostgreSQL (diseño)
- Seguridad: Argon2id, cookies HttpOnly/Secure/SameSite

## Estructura
- `/` — Home
- `/menu` — Carta con filtros
- `/reservar` — Formulario validado con Zod
- `/contacto` — Datos y horarios
- `/admin` — Panel de administración
- `/api/reservations` — POST/GET de reservas

## Cómo funciona la reserva
1. Cliente llena el formulario.
2. POST a `/api/reservations`.
3. Servidor valida con Zod.
4. Si es válido, se guarda y aparece en el admin.

## Contacto
WhatsApp: 918 641 720
