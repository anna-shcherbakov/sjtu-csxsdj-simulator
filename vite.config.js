import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    host: process.env.TAURI_DEV_HOST || false,
    port: 5173,
    strictPort: true,
    hmr: process.env.TAURI_DEV_HOST
      ? {
          host: process.env.TAURI_DEV_HOST,
          port: 5173,
          protocol: 'ws',
        }
      : undefined,
  },
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  build: {
    target:
      process.env.TAURI_ENV_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    sourcemap: Boolean(process.env.TAURI_ENV_DEBUG),
  },
})
