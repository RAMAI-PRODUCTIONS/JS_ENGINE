/**
 * Build script that creates date/time folders and manages builds
 */
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, statSync, rmSync, writeFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

/**
 * Generate build folder name
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

/**
 * Clean old builds (keep last N)
 */
function cleanOldBuilds(keepLast = 5) {
  const buildDir = join(rootDir, 'build');
  
  if (!existsSync(buildDir)) {
    return;
  }
  
  const folders = readdirSync(buildDir)
    .filter(f => {
      const fullPath = join(buildDir, f);
      return statSync(fullPath).isDirectory() && /^\d{8}-\d{6}$/.test(f);
    })
    .sort()
    .reverse();
  
  const toDelete = folders.slice(keepLast);
  
  console.log(`\nCleaning old builds (keeping last ${keepLast})...`);
  toDelete.forEach(folder => {
    const fullPath = join(buildDir, folder);
    console.log(`  Removing: ${folder}`);
    rmSync(fullPath, { recursive: true, force: true });
  });
  
  if (toDelete.length === 0) {
    console.log('  No old builds to clean');
  }
}

/**
 * Main build function
 */
async function build() {
  const buildFolderName = getBuildFolderName();
  const buildDir = join(rootDir, 'build', buildFolderName);
  
  console.log('========================================');
  console.log('BUILDING JS GAME ENGINE');
  console.log('========================================');
  console.log(`Build folder: ${buildFolderName}`);
  console.log(`Full path: ${buildDir}`);
  console.log('');
  
  // Create build directory
  if (!existsSync(buildDir)) {
    mkdirSync(buildDir, { recursive: true });
  }
  
  // Set environment variable for vite
  process.env.BUILD_FOLDER = buildFolderName;
  
  // Build web app
  console.log('Building web app...');
  try {
    execSync('npm run build:web', { 
      stdio: 'inherit',
      cwd: rootDir,
      env: { ...process.env, BUILD_FOLDER: buildFolderName }
    });
    console.log('✓ Web build complete');
  } catch (error) {
    console.error('✗ Web build failed');
    process.exit(1);
  }
  
  // Save current build folder
  const currentBuildFile = join(rootDir, 'build', '.current-build');
  writeFileSync(currentBuildFile, buildFolderName, 'utf8');
  
  console.log(`\n✓ Build complete!`);
  console.log(`  Build folder: build/${buildFolderName}`);
  console.log(`  Web assets: build/${buildFolderName}/dist`);
  
  // Clean old builds
  cleanOldBuilds(5);
  
  console.log('\n========================================');
}

build().catch(console.error);

