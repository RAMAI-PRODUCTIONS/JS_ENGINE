/**
 * Build utilities for generating date/time-based build folders
 */

/**
 * Generate a unique folder name based on date and time
 * Format: YYYYMMDD-HHMMSS
 */
export function getBuildFolderName() {
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
 * Get the latest build folder
 */
export function getLatestBuildFolder() {
  const fs = require('fs');
  const path = require('path');
  const buildDir = path.join(process.cwd(), 'build');
  
  if (!fs.existsSync(buildDir)) {
    return null;
  }
  
  const folders = fs.readdirSync(buildDir)
    .filter(f => {
      const fullPath = path.join(buildDir, f);
      return fs.statSync(fullPath).isDirectory() && /^\d{8}-\d{6}$/.test(f);
    })
    .sort()
    .reverse();
  
  return folders.length > 0 ? path.join(buildDir, folders[0]) : null;
}

/**
 * Clean old build folders (keep last N builds)
 */
export function cleanOldBuilds(keepLast = 5) {
  const fs = require('fs');
  const path = require('path');
  const buildDir = path.join(process.cwd(), 'build');
  
  if (!fs.existsSync(buildDir)) {
    return;
  }
  
  const folders = fs.readdirSync(buildDir)
    .filter(f => {
      const fullPath = path.join(buildDir, f);
      return fs.statSync(fullPath).isDirectory() && /^\d{8}-\d{6}$/.test(f);
    })
    .sort()
    .reverse();
  
  // Keep the latest N builds
  const toDelete = folders.slice(keepLast);
  
  toDelete.forEach(folder => {
    const fullPath = path.join(buildDir, folder);
    console.log(`Cleaning old build: ${folder}`);
    fs.rmSync(fullPath, { recursive: true, force: true });
  });
}

