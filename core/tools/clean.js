/**
 * Clean build files and folders
 */
import { existsSync, rmSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url)).replace(/\\/g, '/').replace(/\/[^/]+\/?$/, '');
const rootDir = resolve(__dirname, '../..');

const foldersToClean = [
  'dist',
  'node_modules/.vite',
  'node_modules/.cache',
  '.vite',
  '.cache'
];

const filesToClean = [
  '*.log',
  '*.tmp',
  '.DS_Store',
  'Thumbs.db'
];

const buildDir = join(rootDir, 'build');

console.log('========================================');
console.log('CLEANING BUILD FILES');
console.log('========================================\n');

// Clean temporary folders
foldersToClean.forEach(folder => {
  const fullPath = join(rootDir, folder);
  if (existsSync(fullPath)) {
    console.log(`Removing: ${folder}`);
    rmSync(fullPath, { recursive: true, force: true });
  }
});

// Clean Android build artifacts
const androidBuildDir = join(rootDir, 'android', 'app', 'build');
if (existsSync(androidBuildDir)) {
  console.log('Removing: android/app/build');
  rmSync(androidBuildDir, { recursive: true, force: true });
}

const androidPluginsBuildDir = join(rootDir, 'android', 'capacitor-cordova-android-plugins', 'build');
if (existsSync(androidPluginsBuildDir)) {
  console.log('Removing: android/capacitor-cordova-android-plugins/build');
  rmSync(androidPluginsBuildDir, { recursive: true, force: true });
}

// Clean Android build artifacts (more thorough)
const androidRoot = join(rootDir, 'android');
if (existsSync(androidRoot)) {
  const androidBuildDirs = [
    join(androidRoot, 'app', 'build'),
    join(androidRoot, 'capacitor-cordova-android-plugins', 'build'),
    join(androidRoot, 'build'),
    join(androidRoot, '.gradle')
  ];
  
  androidBuildDirs.forEach(dir => {
    if (existsSync(dir)) {
      console.log(`Removing: ${dir.replace(rootDir, '').replace(/\\/g, '/')}`);
      rmSync(dir, { recursive: true, force: true });
    }
  });
}

// Clean all build folders (optional)
const args = process.argv.slice(2);
if (args.includes('--all-builds')) {
  if (existsSync(buildDir)) {
    const folders = readdirSync(buildDir)
      .filter(f => {
        const fullPath = join(buildDir, f);
        return statSync(fullPath).isDirectory() && /^\d{8}-\d{6}$/.test(f);
      });
    
    if (folders.length > 0) {
      console.log('\nRemoving all build folders:');
      folders.forEach(folder => {
        console.log(`  Removing: build/${folder}`);
        rmSync(join(buildDir, folder), { recursive: true, force: true });
      });
    }
  }
}

console.log('\n✓ Clean complete!');
console.log('========================================');

