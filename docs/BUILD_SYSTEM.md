# Build System Documentation

## Overview

The build system automatically organizes all build outputs into date/time-stamped folders under the `build/` directory. This keeps the main project folder clean and makes it easy to track different build versions.

## Build Folder Structure

```
build/
├── .gitkeep                  # Git tracking file
├── .current-build            # Points to latest build
├── 20241102-143025/         # Example: Nov 2, 2024 at 14:30:25
│   └── dist/                # Web build output
│       ├── index.html
│       ├── assets/
│       └── ...
├── 20241102-150012/         # Another build
│   └── dist/
└── ...
```

## Build Commands

### Standard Build
```bash
npm run build
```
- Creates a new date/time-stamped folder
- Builds web app into `build/YYYYMMDD-HHMMSS/dist`
- Automatically cleans old builds (keeps last 5)
- Updates `.current-build` file for Capacitor

### Web Build Only
```bash
npm run build:web
```
- Direct Vite build (for development)
- Uses current build folder from environment

### Android APK Build
```bash
npm run android:apk
```
- Builds web app
- Syncs to Android
- Builds APK
- APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Clean Build Files
```bash
npm run clean
```
- Removes: `dist/`, `node_modules/.vite`, Android build artifacts
- Does NOT remove build folders by default

### Clean All Builds
```bash
npm run clean -- --all-builds
```
- Removes all date/time-stamped build folders

## How It Works

1. **Build Script** (`scripts/build.js`)
   - Generates folder name: `YYYYMMDD-HHMMSS`
   - Creates build directory
   - Sets `BUILD_FOLDER` environment variable
   - Runs Vite build
   - Saves current build folder to `.current-build`

2. **Vite Config** (`vite.config.js`)
   - Reads `BUILD_FOLDER` from environment
   - Outputs to `build/{BUILD_FOLDER}/dist`
   - Creates build directory if needed

3. **Capacitor Config** (`capacitor.config.ts`)
   - Reads `.current-build` file
   - Points to latest build folder
   - Falls back to latest folder if file missing

## Build Retention

By default, the system keeps the **last 5 builds** and automatically deletes older ones. You can modify this in `scripts/build.js`:

```javascript
cleanOldBuilds(5);  // Change number to keep more/less builds
```

## Android Builds

Android build artifacts are stored in:
- `android/app/build/` - Main build output
- `android/capacitor-cordova-android-plugins/build/` - Plugin builds

These are cleaned with `npm run clean` but you can rebuild them with:
```bash
npm run android:apk
```

## Best Practices

1. **Always use `npm run build`** for production builds
2. **Use `npm run clean`** before committing to clean up artifacts
3. **Keep build folders** for testing different versions
4. **Remove old builds manually** if you need to free space:
   ```bash
   npm run clean -- --all-builds
   ```

## Troubleshooting

### "Build folder not found"
- Run `npm run build` to create a new build
- Check `build/.current-build` file exists

### "Capacitor can't find webDir"
- Make sure you've run `npm run build` first
- Check that `build/.current-build` points to an existing folder

### "Too many build folders"
- Run `npm run clean -- --all-builds` to remove all
- Or manually delete old folders from `build/`

## File Locations

- **Current Build**: `build/.current-build` (text file with folder name)
- **Latest Build**: `build/{latest-folder}/dist/`
- **APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Build Script**: `scripts/build.js`
- **Clean Script**: `scripts/clean.js`

