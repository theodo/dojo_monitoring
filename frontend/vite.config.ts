import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  preview: { port: 3000 },
  build: { sourcemap: 'hidden' },
  plugins: [react()],
});
