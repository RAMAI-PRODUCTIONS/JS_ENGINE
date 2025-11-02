# Quick APK Build Guide

## Prerequisites
- Node.js installed
- Android Studio installed
- Android SDK installed
- Java JDK 17+

## Quick Build (Automated)

Run the batch script:
```cmd
build_apk.cmd
```

## Manual Build Steps

### 1. Build Web App
```cmd
npm run build
```

### 2. Add Android Platform (First time only)
```cmd
npx cap add android
```

### 3. Sync to Android
```cmd
npx cap sync android
```

### 4. Build APK

#### Debug APK (Testing)
```cmd
cd android
gradlew.bat assembleDebug
```

#### Release APK (Distribution)
```cmd
cd android
gradlew.bat assembleRelease
```

### 5. Find Your APK

**Debug APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Release APK:**
```
android/app/build/outputs/apk/release/app-release.apk
```

## Install APK on Device

```cmd
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## Troubleshooting

### "gradlew.bat not found"
- Make sure Android platform was added successfully
- Check that `android/` directory exists

### "SDK location not found"
- Create `android/local.properties`:
```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### "Build failed"
- Check Android Studio is installed
- Verify JDK 17+ is installed
- Run `gradlew.bat clean` in android directory

