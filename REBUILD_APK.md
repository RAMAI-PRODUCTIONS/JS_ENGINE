# 📱 Rebuild APK - Complete Guide

## Quick Rebuild Script

I've created `build-apk.bat` which automates the entire process.

**To rebuild APK, simply run:**
```powershell
.\build-apk.bat
```

## Manual Rebuild Steps

If the script doesn't work, follow these steps:

### Step 1: Install Dependencies
```powershell
npm install
```
*Note: If you get permission errors, close all programs and try again, or run as Administrator.*

### Step 2: Build Web Version
```powershell
npm run build:web
```

This creates the `dist/` folder with all your latest changes including the green `sm_sphere.glb`.

### Step 3: Sync with Capacitor
```powershell
npx cap sync android
```

This copies the `dist/` folder to Android assets.

### Step 4: Build APK
```powershell
cd android
gradlew.bat assembleDebug
cd ..
```

## APK Location After Build

Once complete, your APK will be at:

```
C:\JS_ENGINE\android\app\build\outputs\apk\debug\app-debug.apk
```

## Verify Build

Check if APK exists:
```powershell
Test-Path android\app\build\outputs\apk\debug\app-debug.apk
```

Get APK details:
```powershell
Get-Item android\app\build\outputs\apk\debug\app-debug.apk | Select-Object Name, @{Name='Size(MB)';Expression={[math]::Round($_.Length/1MB, 2)}}, LastWriteTime
```

## Troubleshooting

### npm install fails
- Close all programs using node_modules (VS Code, terminals, etc.)
- Delete `node_modules` folder: `Remove-Item node_modules -Recurse -Force`
- Run `npm install` again

### vite not found
- Ensure `node_modules/.bin/vite` exists
- Run `npm install` to restore dependencies

### Gradle build fails
- Ensure Android Studio is installed
- Check JAVA_HOME is set
- Verify `android/gradlew.bat` exists

### Capacitor sync fails
- Ensure `dist/` folder exists
- Check `capacitor.config.ts` has correct `webDir` path

## What's Included in This Build

- ✅ Green sphere (sm_sphere.glb) with unlit material
- ✅ Latest GitHub Pages fixes
- ✅ WebGL renderer
- ✅ All React Three Fiber updates

---

**Quick Command:**
```powershell
.\build-apk.bat
```

The script will handle everything automatically!

