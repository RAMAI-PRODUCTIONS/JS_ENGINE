# Desktop Build Guide (Windows & Linux)

## Overview

This guide covers building desktop applications for Windows and Linux using Electron. The project uses **Electron** with **electron-builder** to create distributable desktop applications.

## Prerequisites

### Windows
- Windows 10/11 (64-bit)
- Node.js and npm installed
- Visual Studio Build Tools (for native modules if needed)

### Linux
- Linux distribution (Ubuntu, Debian, Fedora, etc.)
- Node.js and npm installed
- Required packages for building:
  ```bash
  # Ubuntu/Debian
  sudo apt-get install -y libnss3-dev libatk-bridge2.0-dev libdrm2 libxkbcommon-dev libgbm-dev libasound2-dev
  
  # Fedora
  sudo dnf install -y nss atk at-spi2-atk libdrm libxkbcommon libgbm alsa-lib
  ```

## Installation

First, install the Electron dependencies:

```bash
npm install
```

This will install:
- `electron` - Electron runtime
- `electron-builder` - Build and package tool
- `@types/node` - TypeScript definitions

## Development

### Running in Development Mode

Run the Electron app in development mode (connects to Vite dev server):

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Electron app
npm run electron:dev
```

The Electron window will connect to `http://localhost:5173` (or your Vite dev server port).

## Building Desktop Applications

### Step 1: Build Web Assets

First, build the web application:

```bash
npm run build
```

This creates a production build in `build/YYYYMMDD-HHMMSS/dist/`.

### Step 2: Build Desktop App

#### Build for Current Platform

```bash
npm run electron:build
```

Builds for your current operating system (Windows on Windows, Linux on Linux).

#### Build for Windows

```bash
npm run electron:build:win
```

Creates Windows installers and portable executables:
- **NSIS Installer**: `build/electron-dist/JS Game Engine Setup x.x.x.exe`
- **Portable**: `build/electron-dist/JS Game Engine x.x.x.exe`

#### Build for Linux

```bash
npm run electron:build:linux
```

Creates Linux packages:
- **AppImage**: `build/electron-dist/JS Game Engine-x.x.x.AppImage`
- **Debian Package**: `build/electron-dist/js-game-engine_x.x.x_amd64.deb`
- **Tarball**: `build/electron-dist/js-game-engine-x.x.x.tar.gz`

#### Build for All Platforms

```bash
npm run electron:build:all
```

Builds for both Windows and Linux (only works on Windows with WSL or a Linux VM).

### Build Output Location

All Electron builds are output to:
```
build/electron-dist/
```

## Windows Build Details

### NSIS Installer
- Full installer with installation directory selection
- Creates Start Menu shortcuts
- Uninstaller included
- Default location: `C:\Program Files\JS Game Engine`

### Portable Executable
- Standalone `.exe` file
- No installation required
- Can run from USB drive or any location
- No registry entries

## Linux Build Details

### AppImage
- Self-contained application
- Works on most Linux distributions
- No installation required
- Make executable: `chmod +x "JS Game Engine-x.x.x.AppImage"`
- Run: `./JS Game Engine-x.x.x.AppImage`

### Debian Package (.deb)
- Standard Debian/Ubuntu package
- Install: `sudo dpkg -i js-game-engine_x.x.x_amd64.deb`
- Uninstall: `sudo apt remove js-game-engine`

### Tarball (.tar.gz)
- Portable archive
- Extract and run the executable
- Good for Arch Linux and other distributions

## Configuration

### App Configuration

Edit `package.json` to customize:

```json
{
  "build": {
    "appId": "com.jsengine.game",
    "productName": "JS Game Engine",
    "version": "1.0.0"
  }
}
```

### Icons

Place icon files in the `electron/` directory:
- **Windows**: `electron/icon.ico` (256x256 recommended)
- **Linux**: `electron/icon.png` (512x512 recommended)

Create icons using tools like:
- [CloudConvert](https://cloudconvert.com/) - Convert PNG to ICO
- [ImageMagick](https://imagemagick.org/) - Command-line conversion
- Online ICO generators

### Window Settings

Edit `electron/main.js` to customize window properties:

```javascript
const mainWindow = new BrowserWindow({
  width: 1280,        // Default width
  height: 720,        // Default height
  minWidth: 800,      // Minimum width
  minHeight: 600,     // Minimum height
  // ... other options
});
```

## Advanced Configuration

### Custom Build Script

The build script (`core/tools/build-electron.js`) handles:
- Finding the latest web build
- Setting environment variables
- Calling electron-builder
- Output management

### Electron Builder Options

Additional options can be added to `package.json`:

```json
{
  "build": {
    "compression": "maximum",
    "win": {
      "target": ["portable"],  // Only portable, no installer
      "artifactName": "${productName}-${version}-${arch}.${ext}"
    },
    "linux": {
      "target": ["AppImage"],  // Only AppImage
      "desktop": {
        "Name": "JS Game Engine",
        "Comment": "A 3D game engine",
        "Categories": "Game;"
      }
    }
  }
}
```

## Troubleshooting

### "No build folder found"
- Run `npm run build` first to create web assets
- Check that `build/.current-build` exists

### "electron-builder not found"
- Run `npm install` to install dependencies
- Check `node_modules` exists

### Windows: "Cannot find module"
- Install Visual Studio Build Tools
- Run: `npm install --global windows-build-tools` (may need admin)

### Linux: "Missing dependencies"
- Install required system packages (see Prerequisites)
- For AppImage, may need to install FUSE: `sudo apt install fuse`

### Build fails on Linux
- Ensure you have all build tools: `sudo apt-get install build-essential`
- Check disk space: `df -h`
- Try cleaning: `npm run clean` then rebuild

### Icons not showing
- Verify icon files exist in `electron/` directory
- Check icon file format (ICO for Windows, PNG for Linux)
- Icon sizes should be appropriate (256x256+ recommended)

### App won't start after build
- Check that `electron/main.js` paths are correct
- Verify web build exists in the expected location
- Run with console to see errors:
  ```bash
  # Windows
  "build\electron-dist\JS Game Engine.exe"
  
  # Linux
  ./build/electron-dist/JS\ Game\ Engine-x.x.x.AppImage
  ```

## Distribution

### Windows Distribution
1. **NSIS Installer**: Best for most users
   - Upload to website or file sharing service
   - Users download and run installer
   
2. **Portable**: Good for tech-savvy users
   - No installation required
   - Can run from anywhere

### Linux Distribution
1. **AppImage**: Best for cross-distro distribution
   - Works on most distributions
   - No installation needed
   
2. **DEB Package**: Best for Debian/Ubuntu users
   - Can be added to repositories
   - Automatic updates possible
   
3. **Tarball**: For manual distribution
   - Good for Arch, Gentoo, etc.

## Code Signing (Optional)

For production releases, consider code signing:

### Windows
- Requires code signing certificate
- Configure in `electron-builder` config
- See: [electron-builder code signing](https://www.electron.build/code-signing)

### Linux
- AppImages can be signed
- Requires GPG key
- See: [electron-builder signing](https://www.electron.build/code-signing)

## File Structure

```
electron/
├── main.js          # Main Electron process
├── preload.js       # Preload script (bridge)
├── icon.ico         # Windows icon
└── icon.png         # Linux icon

build/
├── electron-dist/   # Electron build output
│   ├── *.exe        # Windows executables
│   ├── *.AppImage   # Linux AppImages
│   ├── *.deb        # Debian packages
│   └── *.tar.gz     # Tarballs
└── YYYYMMDD-HHMMSS/ # Web build folders
    └── dist/        # Web assets
```

## Quick Reference

```bash
# Development
npm run electron:dev

# Build for current platform
npm run electron:build

# Build for Windows
npm run electron:build:win

# Build for Linux
npm run electron:build:linux

# Build for all platforms
npm run electron:build:all
```

## See Also

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-builder Documentation](https://www.electron.build/)
- [Build System Guide](./BUILD_SYSTEM.md)
- [Android Build Guide](./ANDROID_BUILD_GUIDE.md)

