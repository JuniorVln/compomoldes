# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

New website for **Compomoldes** — a Brazilian B2B company selling injection mold components (componentes para moldes de injeção). The site is product-catalog focused with technical specs per product.

## Commands

```bash
npm run dev       # Start dev server (Vite, port 5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

No test suite or linter configured.

## Architecture

This is a **single-page React app** with no routing library and no TypeScript.

- **`src/App.jsx`** — everything lives here: all components, all product/line data, and the routing logic. No split into separate component files.
- **`src/styles.css`** — all CSS in one file using custom properties only (no CSS framework, no Tailwind).
- **`src/main.jsx`** — entry point, mounts `<App />`.
- **`public/assets/`** — all product images and logos served statically; referenced as `/assets/...` paths.

### Routing

Manual client-side routing via `window.location.pathname` + the `popstate` event. No React Router.

- `/` — home page (hero, product catalog, applications section)
- `/produtos/{slug}` — individual product page; slug is computed by `slugify(product.name)`

The `App` component reads `window.location.pathname` on mount and on `popstate` to detect which product page (if any) to show. Navigation between pages uses `<a href="...">` tags (full reloads) or `window.location.href` assignments.

### Data

All product data is hardcoded in `App.jsx`:
- `products` — 12 products with name, line, image, summary, specs
- `productLines` — 12 product line names
- `lineApplications` — maps each line to its application list
- `productDetails()` — derives code, availability, features, application, and table data from a product

### Key components

- `LogoMark3D` — Three.js canvas that renders the Compomoldes logo as a layered 3D object with mouse-parallax effect
- `ProductPage` — full product detail view with sidebar, gallery, specs, technical table, and related products
- `App` — top-level shell with sticky header (search bar, mega-menu, nav) and decides whether to render `ProductPage` or the home sections

## Design System

Defined entirely via CSS custom properties in `styles.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--orange` | `#f68b34` | Primary CTA, accents, product line labels, hyperlinks |
| `--orange-soft` | `#f9ae71` | Hover accents |
| `--graphite` | `#33343a` | Header/nav background, dark bands, active states, UI text |
| `--graphite-deep` | `#202127` | Search button, footer background, deepest accents |
| `--ink` | `#17181c` | Body text |
| `--muted` | `#687584` | Secondary text |
| `--line` | `#e2e8ec` | Borders |
| `--surface` | `#f7f9fa` | Page background |

Max content width is `1460px` throughout. Responsive breakpoints at `1120px` and `760px`.

## Reference Materials

- **`briefing.md`** — client brief: design direction (minimalist, product-first), reference sites (casafer.com.br, polimold), competitors
- **`site-atual-compomoldes/`** — current live site scraped with Firecrawl (markdown, HTML, screenshots, branding JSON)
- **`Referencias/`** — reference images for header layout, hero, and product submenu design
- **`site-atual-compomoldes/README.md`** — extracted branding (confirmed orange `#F68B34`, blue `#2B5672`)

The `.firecrawl/` directory mirrors `site-atual-compomoldes/firecrawl-pages/` and can be ignored in favor of the latter.
