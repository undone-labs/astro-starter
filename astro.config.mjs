import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Set this to your production domain — required for sitemap + canonical URLs
  site: 'https://example.com',

  output: 'static',

  integrations: [
    alpinejs(),
    sitemap(),
  ],

  // Security headers for the dev server.
  // For production static deploys, see public/_headers (Netlify/Cloudflare)
  // or netlify.toml — static adapters don't serve headers at runtime.
  vite: {
    server: {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      },
    },
  },
});
