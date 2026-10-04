# NEXA — Soluciones Digitales

Sitio y portafolio de NEXA, un estudio de desarrollo en Pucallpa (Perú). Hacemos páginas web, asistentes de WhatsApp y automatizaciones para negocios.

**En vivo:** https://nexa-portafolio.vercel.app

## Proyectos incluidos

| Demo | Ruta | Qué muestra |
|------|------|-------------|
| Sabor Criollo | [`/demos/restaurante`](https://nexa-portafolio.vercel.app/demos/restaurante) | Sitio completo de restaurante: carta con filtros, reservas validadas con Zod, contacto, blog, páginas legales, aviso de cookies y panel de administración para editar platos e imágenes. |
| Steakhouse | [`/demos/steakhouse`](https://nexa-portafolio.vercel.app/demos/steakhouse) | Landing bilingüe (español e inglés) para una parrilla premium: menú móvil accesible, reserva validada con Zod y animaciones al hacer scroll. |

Cada demo tiene su caso de estudio en `/proyectos/<slug>` (reto, recorrido por pantallas, métricas de Lighthouse y detalles técnicos).

Los demos usan datos de ejemplo. En Sabor Criollo, los cambios del panel se guardan en el `localStorage` del navegador y las rutas de API trabajan en memoria; `app/demos/restaurante/db/schema.sql` es el diseño de la base de datos PostgreSQL, que aún no está conectada.

## Stack

Esto es lo que usa el repositorio, según `package.json`:

- Next.js 16 (App Router) y React 19
- TypeScript
- Tailwind CSS 4
- Zod 4 para validar formularios y rutas de API
- Despliegue en Vercel

## Estructura

```
app/
├── layout.tsx              # Layout raíz: metadata y SEO
├── (sitio)/                # Páginas de NEXA (con las fuentes de la marca)
│   ├── page.tsx            # Home: solo compone las secciones
│   └── proyectos/[slug]/   # Casos de estudio, generados en build
├── globals.css             # Tokens de marca (colores, tipografía) y animaciones
├── _components/            # Secciones de la home (Header, Hero, Proyectos, Precios…)
├── _data/                  # Textos, proyectos, métricas de Lighthouse y datos del sitio
├── icon.svg, apple-icon.png, opengraph-image.png
├── robots.ts, sitemap.ts
└── demos/
    ├── restaurante/        # Sabor Criollo
    └── steakhouse/         # Steakhouse
proxy.ts                    # Límite de solicitudes para las rutas de API de los demos
public/proyectos/           # Capturas de los demos que se usan en la home
```

## Marca

| Token | Color | Uso |
|-------|-------|-----|
| `tinta` | `#13201E` | Texto y superficies oscuras |
| `selva` | `#0E3A34` | Color principal de la marca |
| `papel` | `#F3F5F1` | Fondo |
| `arcilla` | `#C2410C` | Acciones principales |
| `mango` | `#FFB27A` | Acento sobre fondos oscuros |

Tipografías: Young Serif para títulos y Figtree para el texto.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

Si cambias el contenido de la home o de los casos de estudio, edita `app/_data/contenido.ts`. Las métricas que se muestran están en `app/_data/metricas.ts`; para actualizarlas, mide el sitio publicado con `npx lighthouse <url>` (modo celular) o en PageSpeed Insights. Para cambiar el dominio, el número de WhatsApp o el enlace de GitHub, edita `app/_data/sitio.ts`.

## Contacto

WhatsApp: [918 641 720](https://wa.me/51918641720)
