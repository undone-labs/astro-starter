# Astro Starter

A static site template repo built with [Astro](https://astro.build) and [Alpine.js](https://alpinejs.dev). Optimised for minimal Javascript footprint, performance, a11y, and SEO.

## Stack

- **Astro 6** — static output, client-side routing via `<ClientRouter />`
- **Alpine.js** — lightweight interactivity, no build step
- **Plain CSS** — custom properties, fluid type scale, no framework
- **Bun** — package manager and script runner

---

## Getting started

```bash
bun install
bun dev        # http://localhost:11220
bun build      # outputs to dist/
bun preview    # preview the dist/ build locally
```

---

## Directory structure

```
/
├── public/
│   ├── _headers          # Cloudflare Pages security headers + CSP
│   ├── favicon.ico
│   ├── fonts/            # Self-hosted webfonts
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── fonts/        # Source fonts (processed by Vite)
│   │   └── images/       # Images processed by Astro's <Image /> component
│   │
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Nav.astro
│   │   └── SEO.astro     # <title>, meta, canonical, OG, Twitter card
│   │
│   ├── config/
│   │   └── site.ts       # Site-wide constants (name, URL, description, OG image)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro  # Root HTML shell, accepts SEO + JSON-LD props
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   └── 404.astro
│   │
│   └── styles/
│       ├── reset.css
│       ├── variables.css
│       └── global.css
│
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

---

## Configuration

### Site metadata

Edit `src/config/site.ts` before deploying:

```ts
export const SITE = {
  name: 'Your Site Name',
  tagline: 'Short description',
  description: 'Longer description used as the default meta description.',
  url: 'https://foo.com',
  defaultOgImage: '/og-default.png',
} as const;
```

### Production domain

Set `site` in `astro.config.mjs` to your production URL. This is required for correct canonical URLs and sitemap generation:

```js
export default defineConfig({
  site: 'https://foo.com',
  // ...
});
```

Also update the `Sitemap:` entry in `public/robots.txt` to match.

### Local development server

Configured in `astro.config.mjs`:

```js
server: {
  port: 11220,
},
```

---

## Adding pages

Create a new `.astro` file in `src/pages/`. Pass `title` and `description` to `BaseLayout`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title" description="Page description for search engines.">
  <section>
    <div class="container">
      <h1>Page Title</h1>
    </div>
  </section>
</BaseLayout>
```

The `title` prop renders as `Page Title - Site Name` in `<title>`. Omit it on the home page to render just the site name.

### Nav links

Add entries to the `navLinks` array in `src/components/Nav.astro`:

```ts
const navLinks = [
  { label: 'Home',    href: '/'       },
  { label: 'About',   href: '/about'  },
  { label: 'Blog',    href: '/blog'   },
];
```

---

## SEO

### Per-page metadata

All props are optional and fall back to values in `src/config/site.ts`:

```astro
<BaseLayout
  title="Page Title"
  description="Page-specific description."
  ogImage="/og-custom.png"
  noindex={false}
>
```

Set `noindex={true}` on pages that should not be indexed (e.g. thank-you pages).

### JSON-LD

Pass a structured data object to `BaseLayout` via the `jsonLD` prop:

```astro
---
const jsonLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Page Title',
  url: 'https://foo.com/page',
};
---

<BaseLayout title="Page Title" jsonLD={jsonLD}>
```

Only pass developer-controlled data — never raw user input.

### Sitemap

Generated automatically at build time by `@astrojs/sitemap`. The output file is `dist/sitemap-index.xml`. It will 404 in dev, this is expected.

---

## Fonts

Self hosted fonts are recommended.

1. Move font files, ideally `.woff2` in `public/fonts/`
2. Add `@font-face` declarations in `src/styles/global.css`
3. Update `--font-sans` (and/or `--font-display`) in `src/styles/variables.css`

```css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Security headers

Production headers are configured in `public/_headers` (Cloudflare Pages format). The Content Security Policy includes `unsafe-eval` required by Alpine.js v3. Tighten `img-src` and `connect-src` as needed for your CDN or API domains.

Dev server headers are set in the `vite.server.headers` block in `astro.config.mjs`.


## Deployment

Assuming a static site host like Cloudflare Pages, Github Pages, Netlify:

- Build command: `bun run build`
- Set output directory: `dist`
- Ensure Node version is set to **22** or higher in environment settings
- Add any environment variables (none by default)
