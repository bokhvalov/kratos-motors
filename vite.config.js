import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function resolveBase(raw) {
  if (!raw || raw === '/') return '/'
  return raw.endsWith('/') ? raw : `${raw}/`
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = resolveBase(env.VITE_BASE_PATH || process.env.VITE_BASE_PATH)

  return {
    base,
    plugins: [react()],
    server: {
      host: '0.0.0.0', // listen on all interfaces (LAN)
    },
    preview: {
      host: '0.0.0.0',
    },
  }
})
