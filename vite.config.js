import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/portfolio/"  // HARUS sama persis dengan nama repo
})
