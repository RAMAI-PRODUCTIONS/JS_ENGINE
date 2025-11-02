import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate build folder name with date/time
 */
function getBuildFolderName() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

// For GitHub Pages or simple web builds, use dist directly
// For custom builds (Android/iOS), use date-based folders
const useSimpleDist = process.env.VITE_BUILD_OUTDIR === 'dist' || !process.env.BUILD_FOLDER;

let distDir;
if (useSimpleDist) {
  // Simple dist folder for GitHub Pages
  distDir = path.resolve(__dirname, 'dist');
} else {
  // Date-based build folders for custom builds
  const buildFolderName = process.env.BUILD_FOLDER || getBuildFolderName();
  const buildDir = path.resolve(__dirname, 'build', buildFolderName);
  distDir = path.resolve(buildDir, 'dist');

  // Create build folder if it doesn't exist
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  // Save build folder name to file for Capacitor to read
  fs.writeFileSync(
    path.resolve(__dirname, 'build', '.current-build'),
    buildFolderName,
    'utf8'
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || './', // GitHub Pages base path (set via env var in CI)
  resolve: {
    alias: {
      '@engine': path.resolve(__dirname, './core/engine'),
      '@game': path.resolve(__dirname, './project/code'),
      '@assets': path.resolve(__dirname, './project/assets')
    }
  },
  build: {
    target: 'esnext',
    outDir: process.env.VITE_BUILD_OUTDIR || distDir, // Allow override for GitHub Pages
    assetsDir: 'assets',
    minify: 'esbuild', // Faster than terser
    sourcemap: false,
    emptyOutDir: true, // Clean dist folder in build directory
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
          'react-vendor': ['react', 'react-dom']
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['@capacitor/core', '@capacitor/android', '@capacitor/ios']
  }
});
