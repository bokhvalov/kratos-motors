# Kratos Motors — Website

Production-ready marketing website for an automotive service & tuning workshop. Built as a single-page app with multi-language support, SEO meta handling, and responsive, content-heavy pages (services, brand landing pages, portfolio, and builds gallery).

- **Live demo**: _add link_
- **Design**: https://www.figma.com/design/TG5ajCDdNzndaumQw6WIMo/KRATOS-MOTORS?node-id=0-1&t=CFdMcjSPZQiohxLo-1

## Highlights

- **SPA routing**: nested layout, brand pages, and 404 handling (React Router)
- **Internationalization**: PL / EN / RU via i18next
- **SEO**: canonical URLs, Open Graph/Twitter meta, per-page title/description
- **Responsive UI**: mobile-first layout, adaptive sections, accessible modals
- **Media**: responsive images + generated WebP variants
- **CI/CD**: lint + build checks, GitHub Pages deployment

## Tech stack

- React 18, Vite 5
- React Router
- i18next
- Swiper
- ESLint

## Project structure

- `src/pages/` — route-level pages
- `src/components/` — layout + shared blocks + feature components
- `src/ui/` — UI primitives (buttons, inputs, headings, links)
- `src/lib/` — helpers, page data, assets utilities
- `src/locales/` — translations and service modal copy
- `public/assets/` — static media

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run lint
npm run build
npm run preview
```
