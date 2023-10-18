import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    target: 'esnext',
  },
  base: '',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
      },
      manifest: {
        name: 'LunchApp',
        short_name: 'LunchApp',
        description: 'Opiskelijaravintolasovellus',
        theme_color: '#ebd03b',
        icons: [
          {
            src: 'src/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'src/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'src/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'src/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
