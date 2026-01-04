import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url';

// Utility for resolving paths correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup aliases for absolute imports (essential for large projects like Facebook)
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    // Increase chunk size limit typical for feature-rich applications
    chunkSizeWarningLimit: 1500, 
    rollupOptions: {
      output: {
        // Manual chunking strategy for better load times of core dependencies
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core library grouping
            if (id.includes('react') || id.includes('react-dom') || id.includes('framer-motion')) {
              return 'vendor_react_core';
            }
            // Network dependencies
            if (id.includes('axios')) {
                return 'vendor_network';
            }
            // All other vendors
            return 'vendor'; 
          }
        },
      },
    },
  },
})