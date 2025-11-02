# 📱 Building Android APK - Manual Steps

If the automated build script encounters issues, follow these steps manually:

## Step 1: Install Dependencies (if needed)
```powershell
npm install
```

## Step 2: Build Web Version
```powershell
npm run build:web
```

This creates the `dist/` folder with all web assets.

## Step 3: Sync with Capacitor
```powershell
npx cap sync android
```

This copies the `dist/` folder to Android assets.

## Step 4: Build APK

### Option A: Using Gradle (Command Line)
```powershell
cd android
gradlew.bat assembleDebug
cd ..
```

### Option B: Using Android Studio
```powershell
npm run android
```

Then in Android Studio:
- Build → Build Bundle(s) / APK(s) → Build APK(s)
- APK will be in `android/app/build/outputs/apk/debug/`

## Step 5: Find Your APK

After build completes, the APK will be at:

```
android\app\build\outputs\apk\debug\app-debug.apk
```

**Full Path:**
```
C:\JS_ENGINE\android\app\build\outputs\apk\debug\app-debug.apk
```

## Quick Command (All-in-One)

If everything is set up correctly:
```powershell
npm run android:apk
```

## Troubleshooting

### Permission Errors
- Close any programs using node_modules (IDEs, file explorers)
- Run terminal as Administrator if needed
- Delete `node_modules` and reinstall: `Remove-Item node_modules -Recurse -Force; npm install`

### Build Fails
- Ensure Android Studio and SDK are installed
- Check JAVA_HOME is set correctly
- Verify Gradle wrapper exists: `android\gradlew.bat`

### Asset Not Found
- Verify `dist/` folder exists and has `index.html`
- Check `capacitor.config.ts` points to correct webDir
- Run `npx cap sync android` after building

## APK Info

- **Package:** com.jsengine.game
- **App Name:** JS Game Engine  
- **Build Type:** Debug (unsigned, for testing)
- **Size:** ~15-30 MB typically

