import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

const remotePanels = process.env.VITE_REMOTE_PANELS_URL ?? 'http://localhost:5001/assets/remoteEntry.js';
const remoteRaceTrack = process.env.VITE_REMOTE_RACE_TRACK_URL ?? 'http://localhost:5002/assets/remoteEntry.js';

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
        panels: remotePanels,
        raceTrack: remoteRaceTrack,
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
