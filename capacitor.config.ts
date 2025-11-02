import { CapacitorConfig } from '@capacitor/cli';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the current build folder
 */
function getCurrentBuildDir(): string {
  const buildInfoFile = join(__dirname, 'build', '.current-build');
  
  if (existsSync(buildInfoFile)) {
    const buildFolder = readFileSync(buildInfoFile, 'utf8').trim();
    const buildPath = join(__dirname, 'build', buildFolder, 'dist');
    
    if (existsSync(buildPath)) {
      return buildPath;
    }
  }
  
  // Fallback to latest build folder
  const buildDir = join(__dirname, 'build');
  if (existsSync(buildDir)) {
    const folders = readdirSync(buildDir)
      .filter((f: string) => {
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
  return join(__dirname, 'dist');
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

