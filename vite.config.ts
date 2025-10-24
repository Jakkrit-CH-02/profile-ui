import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "build"
  },
  server: {
    port: 7008,
  },
  preview: {
    port: 7008,
  },
  plugins: [react()],
})
