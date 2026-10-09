---
version: 2
slug: "app-es-demos-veluno-page-tsx"
primary_target: "app/(es)/demos/veluno/page.tsx"
related_targets:
  - "app/(es)/demos/veluno/components/Landing.tsx"
  - "app/(es)/demos/veluno/landing.module.css"
---

Scope: /demos/veluno, the whole landing (header + four chapters + footer). Mode: Persuade.
Audience: portfolio visitors judging frontend craft; in the fiction, electronics shoppers. Action: "Comprar ahora" (hero CTA and the closing purchase section, which honestly says the demo has no store). Constraints: no backend, header kept exactly as built in v1, copy derived only from the reference's own lines, no invented specs, figures or testimonials.

## Direction contract

THESIS: One product, one camera. The page is a slow push-in on the SonicWave earcup: the framed hero opens to full bleed, the camera closes in while the room darkens, and the sound chapter takes over in the dark. Refuses the category default of hero + feature grid + specs table; there are no specs to show, so the page sells with framing, rhythm and light.

OWN-WORLD: Off-white canvas (#fbfbfa) under the untouched header; the lilac AirPods-style photo as a wide rounded frame, aligned to the header logo axis; deep night (#121016) for sound with thin lilac strokes; warm sand (#f1eee9) for the design editorial; Outfit in medium weight, tight tracking at display sizes; black pill buttons on light, white pill on photo.

STORY: Hero (title, description, CTA, SonicWave chip, hotspot on the earcup) → frame opens and the copy leaves → "Diseñados para tu día a día." → night falls → "Así suena SonicWave." → sound chapter, each quality lights up with its own wave → "Confort, estilo y rendimiento." editorial with the copper earcup crop → SonicWave, $ 99.99, Comprar ahora (honest notice) → footer back to NEXA.

FIRST VIEWPORT: Header identical to v1 (same frame, same scale unit). Hero frame ~1380px wide at 1440 (edge margin clamp(.5rem, 2.1vw, 2.5rem), max 115rem), height = viewport minus header (≈79% at 1440×900); copy block bottom-left on the logo axis; chip lower-right; hotspot on the earcup.

MOTION: CSS scroll-driven animations only (view-timeline), compositor properties plus clip-path; no JS animation loop. Everything sits inside @supports (animation-timeline: view()) and prefers-reduced-motion: no-preference; otherwise the chapters are static sections.

FORM: Brief-pinned redesign of a reference recreation. Generated video (scroll-world) was not produced: it needs paid credits and the user's explicit authorization.

FINISH: unreviewed and undocumented is unfinished; final captures live in docs/veluno/capturas.
