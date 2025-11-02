import { CapacitorConfig } from '@capacitor/cli';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Get the current build folder
 * Prefers dist/ for GitHub Pages builds, falls back to timestamped build folders
 */
function getCurrentBuildDir(): string {
  // First, check for dist/ (used by GitHub Pages and build:web)
  const distDir = join(process.cwd(), 'dist');
  if (existsSync(distDir) && existsSync(join(distDir, 'index.html'))) {
    return distDir;
  }
  
  // Fallback to timestamped build folders (for custom builds)
  const buildInfoFile = join(process.cwd(), 'build', '.current-build');
  
  if (existsSync(buildInfoFile)) {
    const buildFolder = readFileSync(buildInfoFile, 'utf8').trim();
    const buildPath = join(process.cwd(), 'build', buildFolder, 'dist');
    
    if (existsSync(buildPath)) {
      return buildPath;
    }
  }
  
  // Fallback to latest build folder
  const buildDir = join(process.cwd(), 'build');
  if (existsSync(buildDir)) {
    const folders = readdirSync(buildDir)
      .filter((f) => {
        const fullPath = join(buildDir, f);
        return statSync(fullPath).isDirectory() && /^\d{8}-\d{6}$/.test(f);
      })
      .sort()
      .reverse();
    
    if (folders.length > 0) {
      return join(buildDir, folders[0], 'dist');
    }
  }
  
  // Default fallback
  return distDir;
}

const config: CapacitorConfig = {
  appId: 'com.jsengine.game',
  appName: 'JS Game Engine',
  webDir: getCurrentBuildDir(),
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;

