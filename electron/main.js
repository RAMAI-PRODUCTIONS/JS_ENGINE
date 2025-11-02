/**
 * Electron Main Process
 * Entry point for the desktop application
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Determine if we're in development or production
const isDev = !app.isPackaged;

/**
 * Get the path to the built web app
 */
function getWebContentPath() {
  if (isDev) {
    // In development, serve from Vite dev server (usually localhost:5173)
    return 'http://localhost:5173';
  } else {
    // In production, electron-builder packages files in different locations
    const fs = require('fs');
    let indexPath;
    
    // electron-builder packages files from build/*/dist/**/* into the app
    // __dirname in packaged app points to app.asar/electron/
    // So dist files will be at __dirname/../dist/ (one level up from electron/)
    
    // Try different possible locations (order matters - most likely first)
    const possiblePaths = [
      // Standard location in packaged app (electron-builder puts dist at app root)
      path.join(__dirname, '..', 'dist', 'index.html'),
      // Alternative location if structure is different
      path.join(process.resourcesPath || __dirname, 'app', 'dist', 'index.html'),
      // Resources directory (for extraResources)
      path.join(process.resourcesPath || __dirname, 'dist', 'index.html'),
      // Unpacked resources location
      path.join(process.resourcesPath || __dirname, 'app.asar.unpacked', 'dist', 'index.html'),
    ];
    
    // Also try to find latest build folder (development/unpacked scenario)
    const appDir = path.join(__dirname, '..');
    const buildRoot = path.join(appDir, 'build');
    if (fs.existsSync(buildRoot)) {
      try {
        const folders = fs.readdirSync(buildRoot)
          .filter(f => {
            const fullPath = path.join(buildRoot, f);
            return fs.statSync(fullPath).isDirectory() && /^\d{8}-\d{6}$/.test(f);
          })
          .sort()
          .reverse();
        
        if (folders.length > 0) {
          const devPath = path.join(buildRoot, folders[0], 'dist', 'index.html');
          possiblePaths.unshift(devPath);
        }
      } catch (e) {
        // Ignore errors reading build folder
      }
    }
    
    // Find first existing path
    for (const testPath of possiblePaths) {
      try {
        if (fs.existsSync(testPath)) {
          indexPath = testPath;
          break;
        }
      } catch (e) {
        // Continue to next path
      }
    }
    
    // Final fallback
    if (!indexPath) {
      indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    }
    
    // Convert to file:// URL format (Windows needs forward slashes)
    return `file://${indexPath.replace(/\\/g, '/')}`;
  }
}

/**
 * Create the main application window
 */
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, isDev ? '../public/icon.png' : 'icon.png'),
    show: false, // Don't show until ready
    backgroundColor: '#000000'
  });

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus the window
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Load the web content
  const webPath = getWebContentPath();
  
  if (isDev) {
    mainWindow.loadURL(webPath);
  } else {
    mainWindow.loadFile(webPath);
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    require('electron').shell.openExternal(navigationUrl);
  });
});

// Handle IPC messages from renderer process
ipcMain.handle('get-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

