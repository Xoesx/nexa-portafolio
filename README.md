# NEXA Soluciones Digitales

Sitio y portafolio de NEXA, un estudio de desarrollo web en Pucallpa (Perú) con más de 4 años de experiencia. Hacemos páginas web, agendas de citas, catálogos con buscador y sistemas a medida para negocios del Perú y de otros países.

**En vivo:** https://nexaportafolio.site · **English:** https://nexaportafolio.site/en

![CI](https://github.com/Xoesx/nexa-portafolio/actions/workflows/ci.yml/badge.svg)

## Proyectos incluidos

| Demo | Ruta | Qué muestra |
|------|------|-------------|
| Clínica Dental Alba | [`/demos/dental`](https://nexaportafolio.site/demos/dental) | La portada muestra el próximo horario libre para una evaluación y lo deja elegido en la agenda. "¿Qué te está pasando?" lleva del síntoma al tratamiento correcto, y la agenda de 4 pasos solo ofrece horarios en los que entra la duración del tratamiento. La cita se descarga como archivo `.ics`. |
| Raíces Inmobiliaria | [`/demos/inmobiliaria`](https://nexaportafolio.site/demos/inmobiliaria) | Portal de terrenos, casas, departamentos y locales con mapa propio (OpenStreetMap, sin librerías), filtros en soles o dólares guardados en la URL, favoritos con comparativo por m², fichas con asesor, visita agendada y calculadora hipotecaria. |
| Colegio Horizonte | [`/demos/colegio`](https://nexaportafolio.site/demos/colegio) | Calculadora de grado en la portada (regla del 31 de marzo), calendario de admisión que marca la etapa en curso y cuenta los días, y preinscripción en 3 pasos con visitas guiadas que siempre empiezan desde mañana. |
| Sabor Criollo | [`/demos/restaurante`](https://nexaportafolio.site/demos/restaurante) | Restaurante criollo y amazónico con reserva rápida desde la portada, aviso de "abierto ahora" con la hora de Pucallpa, carta por secciones, reservas validadas con Zod en el servidor y panel para el dueño. |

Cada demo tiene su caso de estudio en `/proyectos/<slug>` y en inglés en `/en/projects/<slug>` (reto, pantallas, métricas de Lighthouse y detalles técnicos). Las demos están en español porque se hicieron para negocios del Perú.

Las demos usan datos de ejemplo. Los formularios de la clínica, la inmobiliaria y el colegio se validan pero no envían nada. En Sabor Criollo, los cambios del panel se guardan en el `localStorage` del navegador y las rutas de API validan pero no guardan datos: no hay ninguna ruta pública que liste reservas. `app/(es)/demos/restaurante/db/schema.sql` es el diseño de la base de datos PostgreSQL, que aún no está conectada.

## Stack

- Next.js 16 (App Router) y React 19
- TypeScript en modo estricto
- Tailwind CSS 4
- Zod 4 para validar formularios (en las demos se carga recién al enviar) y rutas de API
- Vitest para las pruebas de la lógica
- GitHub Actions (lint, tipos, pruebas y build en cada push) y despliegue en Vercel

## Estructura

```
app/
├── (es)/                     # Layout raíz en español (<html lang="es">)
│   ├── (sitio)/              # Home y casos de estudio de NEXA (/ y /proyectos/[slug])
│   └── demos/                # Las cuatro demos, cada una con su lib/ y sus pruebas
│       ├── dental/
│       ├── inmobiliaria/
│       ├── colegio/
│       └── restaurante/
├── (en)/en/                  # Versión en inglés (/en y /en/projects/[slug])
├── _components/              # Secciones compartidas por los dos idiomas
├── _data/                    # Textos por idioma, proyectos, precios, métricas y datos del sitio
├── _marca/                   # Fuentes de la marca
├── global-not-found.tsx      # 404 bilingüe
├── globals.css               # Tokens de color, tipografía y animaciones
└── robots.ts, sitemap.ts     # SEO, con las alternativas de idioma
proxy.ts                      # Límite de solicitudes para las rutas de API de las demos
public/proyectos/             # Capturas de las demos (WebP) para la home y los casos de estudio
public/og/                    # Imágenes para compartir de cada caso de estudio
.github/workflows/ci.yml      # Integración continua
```

Los textos de la interfaz están en `app/_data/textos.ts` (un objeto por idioma con la misma forma, así TypeScript avisa si falta una traducción). Los proyectos, los planes y los precios en soles y dólares están en `app/_data/contenido.ts`. El dominio, el WhatsApp, los años de experiencia y el tipo de cambio de referencia están en `app/_data/sitio.ts`. Los puntajes de Lighthouse de `app/_data/metricas.ts` son mediciones reales del sitio publicado (PageSpeed Insights, modo celular).

## Desarrollo

```bash
npm install
npm run dev         # http://localhost:3000
npm run lint
npm run typecheck   # genera los tipos de rutas de Next y corre tsc
npm test            # pruebas con Vitest
npm run build
```

## Pruebas

Las pruebas cubren la lógica que decide qué ve el cliente, separada de los componentes en carpetas `lib/`:

- **Clínica:** días hábiles, turnos según la duración del tratamiento, primer horario libre entre especialistas, enlaces con horario elegido y el archivo `.ics` (fechas en UTC, saltos CRLF y escape de texto).
- **Inmobiliaria:** lectura segura de filtros desde la URL, búsqueda y orden con soles y dólares, y la cuota hipotecaria (se comprueba que el saldo termina en cero en el último mes).
- **Colegio:** edad al 31 de marzo, grado por fecha de nacimiento, fechas imposibles, estado del calendario de admisión y próximas visitas.
- **Restaurante:** abierto o cerrado con la hora del Perú, horario agrupado por días, turnos de reserva, validación con Zod, filtro de imágenes y limpieza de texto.

GitHub Actions corre lint, tipos, pruebas y build en cada push a `main` y en cada pull request.

## Marca

Los colores son variables CSS en `app/globals.css`. El modo oscuro y las secciones `.invertido` solo cambian sus valores, así los componentes usan siempre los mismos nombres.

| Token | Claro | Oscuro | Uso |
|-------|-------|--------|-----|
| `fondo` | `#F7F8FA` | `#0C1119` | Fondo de la página |
| `superficie` | `#FFFFFF` | `#131A25` | Tarjetas, ventanas y campos |
| `alterno` | `#EEF1F5` | `#10161F` | Secciones alternas |
| `tinta` | `#131C2E` | `#E4E8EF` | Texto principal |
| `tenue` | `#4B566C` | `#A0AABD` | Texto secundario |
| `linea` | `#DBE1E9` | `#232C3B` | Bordes y divisores |
| `acento` | `#2F4FBF` | `#91A8F4` | Enlaces, botones y detalles |

Tipografías, cada una con un papel: Archivo ancha para títulos, Source Sans 3 para el texto, IBM Plex Mono para etiquetas y datos, y Caveat solo para las notas escritas a mano. Cada demo tiene su propia identidad (colores y fuentes) para mostrar rango.

### Modo oscuro y movimiento

- El tema se guarda en `localStorage` (`nexa-tema`); si no hay elección, sigue al sistema. Un script en cada layout raíz lo aplica antes del primer pintado, y el CSS del modo oscuro solo afecta a las páginas de NEXA, nunca a las demos.
- Las animaciones al hacer scroll son CSS (`animation-timeline`); en navegadores sin soporte el contenido se muestra quieto. La inclinación 3D con el mouse está en `app/_components/Movimiento.tsx`. Con "reducir movimiento" no se anima nada.

## Contacto

WhatsApp: [+51 918 641 720](https://wa.me/51918641720)
