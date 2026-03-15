import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,vue}'],
      exclude: ['src/main.js', '**/*.spec.js', '**/__tests__/**', 'node_modules'],
    },
  },
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {
        panels: 'http://localhost:5001/assets/remoteEntry.js',
        raceTrack: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: {
        vue: { singleton: true },
        vuex: { singleton: true },
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
