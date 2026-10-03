# NEXA — Soluciones Digitales

Portafolio de desarrollo web, sistemas y automatizaciones con IA.
Incluye demos funcionales para distintos rubros.

## Demo destacada: Sabor Criollo

Restaurante de cocina peruana en Pucallpa. Incluye:

- Sitio público (landing, menú, reservas, contacto, blog)
- Panel de administración con CRUD de platos
- Subida de imágenes con compresión automática
- Sistema de reservas con validación Zod
- Chat en vivo con consentimiento de cookies
- Páginas legales (términos, privacidad, cookies)
- SEO con sitemap y robots.txt

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 · Next.js 15 · TypeScript · Tailwind CSS 4 |
| Backend | Next.js API Routes · Node.js 20 |
| Validación | Zod 3 |
| Base de datos | PostgreSQL 16 (diseño) · SQL |
| Autenticación | Argon2id (diseño) · Cookies HttpOnly |
| Estilos | Tailwind CSS · CSS Modules |
| Testing | Vitest · Testing Library |
| DevOps | Docker · GitHub Actions |
| Deploy | Vercel |

## Estructura del proyecto

nexa-portafolio/
├── app/ # Rutas (App Router)
│ ├── page.tsx # Portafolio principal
│ ├── layout.tsx # Layout raíz
│ ├── globals.css # Estilos globales
│ ├── sitemap.ts # Sitemap dinámico
│ ├── robots.ts # robots.txt
│ └── demos/
│ └── restaurante/ # Demo completa de restaurante
│ ├── layout.tsx # Layout + fuentes + contexto
│ ├── page.tsx # Home
│ ├── menu/ # Carta completa
│ ├── reservar/ # Formulario de reservas
│ ├── contacto/ # Formulario y mapa
│ ├── nosotros/ # Sobre el equipo
│ ├── blog/ # Blog con 3 artículos
│ ├── admin/ # Panel de administración
│ ├── legal/ # Páginas legales
│ ├── api/ # API routes
│ ├── components/ # Componentes reutilizables
│ ├── data/ # Datos estáticos (menú, blog)
│ ├── lib/ # Lógica y utilidades
│ └── db/ # Esquema SQL
├── middleware.ts # Rate limiting y seguridad
├── next.config.ts # Configuración + headers de seguridad
├── tsconfig.json # Configuración de TypeScript
├── package.json # Dependencias
├── Dockerfile # Imagen de producción
├── docker-compose.yml # Stack completo con PostgreSQL
└── .github/workflows/ # CI/CD

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Compilar para producción
npm run build

# Correr tests
npm run test

# Correr linter
npm run lint
