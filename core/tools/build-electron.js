/**
 * Build script for Electron desktop applications
 * Builds for Windows and Linux platforms
 */
import { execSync } from 'child_process';
import { existsSync, readFileSync, cpSync, rmSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '../..');

/**
 * Get the current build folder name
 */
function getCurrentBuildFolder() {
  const currentBuildFile = join(rootDir, 'build', '.current-build');
  
  if (existsSync(currentBuildFile)) {
    return readFileSync(currentBuildFile, 'utf8').trim();
  }
  
  throw new Error('No build folder found. Please run "npm run build" first.');
}

/**
 * Copy dist folder to standard location for electron-builder
 */
function prepareDistForElectron(buildFolderName) {
  const sourceDist = join(rootDir, 'build', buildFolderName, 'dist');
  const targetDist = join(rootDir, 'dist');
  
  // Ensure source exists
  if (!existsSync(join(sourceDist, 'index.html'))) {
    throw new Error(`Dist folder not found: ${sourceDist}`);
  }
  
  console.log('Preparing dist folder for Electron...');
  console.log(`  Source: ${sourceDist}`);
  console.log(`  Target: ${targetDist}`);
  
  // Remove old dist if exists
  if (existsSync(targetDist)) {
    rmSync(targetDist, { recursive: true, force: true });
  }
  
  // Copy dist folder
  mkdirSync(targetDist, { recursive: true });
  cpSync(sourceDist, targetDist, { recursive: true });
  
  console.log('✓ Dist folder prepared');
}

/**
 * Build Electron app for specified platforms
 */
async function buildElectron(platforms = []) {
  const buildFolderName = getCurrentBuildFolder();
  
  console.log('========================================');
  console.log('BUILDING ELECTRON DESKTOP APP');
  console.log('========================================');
  console.log(`Build folder: ${buildFolderName}`);
  console.log(`Platforms: ${platforms.length > 0 ? platforms.join(', ') : 'all'}`);
  console.log('');
  
  // Prepare dist folder for electron-builder
  try {
    prepareDistForElectron(buildFolderName);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
  
  // Set BUILD_FOLDER environment variable for electron-builder
  process.env.BUILD_FOLDER = buildFolderName;
  
  // Build Electron app
  console.log('Building Electron app...');
  try {
    let command = 'npx --yes electron-builder';
    
    if (platforms.length > 0) {
      const platformFlags = platforms.map(p => `--${p}`).join(' ');
      command += ` ${platformFlags}`;
    }
    
    execSync(command, {
      stdio: 'inherit',
      cwd: rootDir,
      env: { ...process.env, BUILD_FOLDER: buildFolderName },
      timeout: 600000  // 10 minute timeout
    });
    
    console.log('\n✓ Electron build complete!');
    
    // Output location depends on platform
    const outputDir = join(rootDir, 'build', 'electron-dist');
    console.log(`  Output directory: ${outputDir}`);
    
  } catch (error) {
    console.error('\n✗ Electron build failed');
    console.error(error.message);
    process.exit(1);
  }
  
  console.log('\n========================================');
}

// Parse command line arguments
const args = process.argv.slice(2);
const platforms = [];

if (args.includes('--win') || args.includes('--windows')) {
  platforms.push('win');
}
if (args.includes('--linux')) {
  platforms.push('linux');
}
if (args.includes('--mac') || args.includes('--macos') || args.includes('--darwin')) {
  platforms.push('mac');
}

// Build for specified platforms or all if none specified
buildElectron(platforms.length > 0 ? platforms : []).catch(console.error);

