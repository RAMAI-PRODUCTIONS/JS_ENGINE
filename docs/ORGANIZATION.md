# 📁 File Organization Guide

## Overview

All files are now organized into categorized folders for easy navigation and maintenance.

## Folder Structure

```
JS_ENGINE/
├── docs/              📚 All documentation files
├── tools/             🛠️ Build tools and helper scripts
│   └── bat/          Batch scripts (.cmd files)
├── scripts/          🔧 JavaScript build scripts
├── engine/           🎮 Engine core
├── game/             🎯 Your game code
├── assets/           📦 Game assets
├── src/              ⚛️ React application
└── build/            📦 Build outputs
```

## File Categories

### 📚 Documentation (`docs/`)

All markdown documentation files:
- `README.md` - Main documentation
- `ENGINE_README.md` - Engine API reference
- `QUICK_START.md` - Quick start guide
- `BUILD_COMMANDS.md` - Build commands
- `BUILD_SYSTEM.md` - Build system docs
- `ANDROID_BUILD_GUIDE.md` - Android guide
- `FOLDER_STRUCTURE.md` - Project structure
- `ORGANIZATION.md` - This file
- Other documentation files

### 🛠️ Tools (`tools/bat/`)

Windows batch scripts:
- `BUILD_ALL.cmd` - Build everything (clean + web + APK)
- `BUILD_QUICK.cmd` - Quick build
- `BUILD.cmd` - Shortcut to BUILD_ALL.cmd
- `DEPLOY_JS_ENGINE.cmd` - GitHub Pages deployment

**Usage:**
```cmd
# From anywhere
tools\bat\BUILD_ALL.cmd

# Or use npm
npm run build:all
```

### 🔧 Scripts (`scripts/`)

JavaScript build scripts:
- `build.js` - Main build script (creates date/time folders)
- `clean.js` - Cleanup script (removes temp files)
- `build-utils.js` - Build utilities

### ⚙️ Configuration Files (Root)

Standard config files stay in root (industry standard):
- `package.json` - NPM dependencies
- `vite.config.js` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `capacitor.config.ts` - Capacitor configuration
- `index.html` - Entry HTML file

## Quick Reference

### Find Documentation
- All docs → `docs/`
- Main README → `README.md` (root) or `docs/README.md`

### Run Build Scripts
- Build everything → `tools\bat\BUILD_ALL.cmd` or `npm run build:all`
- Quick build → `tools\bat\BUILD_QUICK.cmd`

### Build Scripts Location
- JavaScript → `scripts/`
- Batch files → `tools/bat/`

## Benefits of This Organization

1. ✅ **Easy to Find** - Files grouped by purpose
2. ✅ **Clean Root** - Only essential config files in root
3. ✅ **Maintainable** - Clear structure for future additions
4. ✅ **Professional** - Industry-standard organization
5. ✅ **Scalable** - Easy to add new categories

## Adding New Files

### New Documentation
→ Add to `docs/`

### New Batch Script
→ Add to `tools/bat/`

### New JavaScript Script
→ Add to `scripts/`

### New Config File
→ Add to root (if standard) or appropriate folder

## Script Paths

All batch scripts automatically navigate to project root, so they work from any directory:

```cmd
REM Example from tools/bat/BUILD_ALL.cmd
cd /d %~dp0\..\..\  REM Go to project root
```

This ensures scripts work whether run from:
- Project root
- `tools/bat/` folder
- Any subdirectory

