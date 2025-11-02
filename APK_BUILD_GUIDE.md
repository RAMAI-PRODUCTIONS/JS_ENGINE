# 📱 APK Build Guide

## 🎯 APK Location

After building, the APK will be located at:

**Debug APK:**
```
android\app\build\outputs\apk\debug\app-debug.apk
```

**Release APK (after signing):**
```
android\app\build\outputs\apk\release\app-release.apk
```

## 🚀 Quick Build Commands

### Option 1: One-Command Build (Recommended)
```bash
npm run android:apk
```
This will:
1. Build the web version
2. Sync with Capacitor
3. Build the debug APK

### Option 2: Step-by-Step

1. **Build Web Version:**
   ```bash
   npm run build:web
   ```

2. **Sync with Capacitor:**
   ```bash
   npm run cap:sync
   # or
   npx cap sync android
   ```

3. **Build APK:**
   ```bash
   cd android
   gradlew.bat assembleDebug
   # or from root:
   npm run android:apk
   ```

## 📍 Finding Your APK

After building, the APK will be at:

**Full Path:**
```
C:\JS_ENGINE\android\app\build\outputs\apk\debug\app-debug.apk
```

**To locate it:**
```powershell
# Check if APK exists
Get-ChildItem android\app\build\outputs\apk\debug -Filter *.apk

# Get full path
(Get-ChildItem android\app\build\outputs\apk\debug -Filter *.apk).FullName
```

## 🔨 Manual Build (If npm scripts don't work)

If you're having issues with npm scripts, use these commands directly:

```powershell
# 1. Build web
cmd /c "npm run build:web"

# 2. Sync Capacitor
cmd /c "npx cap sync android"

# 3. Build APK
cd android
cmd /c "gradlew.bat assembleDebug"
cd ..

# 4. Check APK location
Get-ChildItem android\app\build\outputs\apk\debug -Filter *.apk
```

## ✅ Verify Build

After building, verify the APK exists:

```powershell
# Check file size (should be 10-50 MB typically)
Get-Item android\app\build\outputs\apk\debug\app-debug.apk | Select-Object Name, Length, LastWriteTime
```

## 📦 APK Details

- **Package Name:** `com.jsengine.game`
- **App Name:** JS Game Engine
- **Version:** Check in `android/app/build.gradle`
- **Build Type:** Debug (unsigned, for testing)
- **Signing:** Not required for debug builds

## 🔐 Building Release APK (Signed)

For production/release APK:

1. **Create signing key** (if needed):
   ```bash
   keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```

2. **Configure signing** in `android/app/build.gradle`

3. **Build release:**
   ```bash
   cd android
   gradlew.bat assembleRelease
   ```

## 🐛 Troubleshooting

### Build Fails - Missing Gradle
- Ensure Android Studio is installed
- Check JAVA_HOME is set
- Verify Gradle wrapper exists: `android\gradlew.bat`

### APK Not Found
- Build might have failed - check error messages
- Look in `android\app\build\outputs\logs\` for build logs
- Try cleaning: `cd android && gradlew.bat clean && gradlew.bat assembleDebug`

### Capacitor Sync Fails
- Ensure `dist/` folder exists (run `npm run build:web` first)
- Check `capacitor.config.ts` is correct

### Permission Issues
- Run terminal as Administrator if needed
- Check file permissions on `android/` folder

## 📱 Installing the APK

Once you have the APK:

1. **Transfer to Android device:**
   - USB: Connect device, copy APK to device
   - Cloud: Upload to Google Drive/Dropbox, download on device
   - Email: Send APK to yourself

2. **Enable Unknown Sources:**
   - Settings → Security → Unknown Sources (enable)

3. **Install:**
   - Tap the APK file
   - Follow installation prompts

## 🎯 Current Status

**Last Build:** Check `android\app\build\outputs\apk\debug\` folder

**To Build Now:**
```bash
npm run android:apk
```

Then find your APK at:
```
android\app\build\outputs\apk\debug\app-debug.apk
```

