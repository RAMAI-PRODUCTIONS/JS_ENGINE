# 📱 APK Location & Build Info

## 📍 APK Will Be Located At:

```
android\app\build\outputs\apk\debug\app-debug.apk
```

**Full Path:**
```
C:\JS_ENGINE\android\app\build\outputs\apk\debug\app-debug.apk
```

## 🚀 To Build APK:

**Quick Command:**
```bash
npm run android:apk
```

This single command will:
1. ✅ Build web version (`npm run build:web`)
2. ✅ Sync with Capacitor (`npx cap sync android`)
3. ✅ Build Android APK (`gradlew.bat assembleDebug`)

## ⏱️ Build Time:

- First build: 5-10 minutes (downloads dependencies)
- Subsequent builds: 2-5 minutes

## 📋 Current Status:

**APK Status:** Not built yet  
**Build Command Running:** Check terminal

## 🔍 After Build Completes:

Check for APK:
```powershell
Get-ChildItem android\app\build\outputs\apk\debug -Filter *.apk
```

Or navigate to:
```
C:\JS_ENGINE\android\app\build\outputs\apk\debug\
```

## 📦 APK Information:

- **File Name:** `app-debug.apk`
- **Type:** Debug (unsigned, for testing)
- **Size:** ~15-30 MB (typical)
- **Package:** `com.jsengine.game`
- **App Name:** JS Game Engine

## 🔄 Alternative Build Methods:

### Method 1: Using npm script (recommended)
```bash
npm run android:apk
```

### Method 2: Step by step
```bash
npm run build:web
npm run cap:sync
cd android
gradlew.bat assembleDebug
```

### Method 3: Using Android Studio
```bash
npm run build:web
npm run cap:sync
npm run android  # Opens Android Studio
# Then: Build → Build Bundle(s) / APK(s) → Build APK(s)
```

## ✅ Verify Build Success:

Once build completes, check:
```powershell
Test-Path android\app\build\outputs\apk\debug\app-debug.apk
```

If `True`, APK is ready! 🎉

## 📱 Install APK:

1. Transfer APK to Android device
2. Enable "Install from Unknown Sources"
3. Tap APK file to install

---

**Current Build:** Running in background  
**Check Terminal:** For build progress and completion

