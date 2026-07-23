import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'axios'],
        },
      },
    },
  },
  
  // Production optimization
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  
  // Asset optimization
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg'],
});
