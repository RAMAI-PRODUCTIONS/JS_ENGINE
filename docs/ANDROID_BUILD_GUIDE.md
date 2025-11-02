# Android Build Guide - Complete Setup

This guide covers everything you need to build APK and AAB files for Android distribution.

## 📋 Prerequisites

### Required Software

1. **Node.js 18+** and npm
   - Download: https://nodejs.org/

2. **Android Studio**
   - Download: https://developer.android.com/studio
   - Required for Android SDK and tools

3. **Java Development Kit (JDK) 17**
   - Download: https://adoptium.net/
   - Set `JAVA_HOME` environment variable

4. **Gradle 8+**
   - Installed automatically with Android Studio
   - Or install manually: https://gradle.org/install/

### Environment Variables (Windows)

```batch
# Add to System Environment Variables
JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk

# Add to PATH
%JAVA_HOME%\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\cmdline-tools\latest\bin
```

### Verify Installation

```bash
# Check Java
java -version
# Should show: openjdk version "17.x.x"

# Check Android SDK
sdkmanager --version

# Check Gradle
gradle --version
```

## 🔧 Project Setup

### 1. Install Project Dependencies

```bash
npm install
```

### 2. Add Android Platform

```bash
npm run cap:add:android
```

This creates the `android/` directory with a native Android project.

### 3. Configure Android Project

Edit `android/app/build.gradle`:

```gradle
android {
    namespace "com.jsengine.game"
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.jsengine.game"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
        
        // Enable multidex for large apps
        multiDexEnabled true
    }
    
    buildTypes {
        debug {
            debuggable true
            minifyEnabled false
        }
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            
            // For signing (see below)
            // signingConfig signingConfigs.release
        }
    }
}

dependencies {
    implementation 'androidx.multidex:multidex:2.0.1'
}
```

## 📦 Building APK (Debug)

Debug APK for testing on devices:

```bash
# Step 1: Build web assets
npm run build

# Step 2: Sync to Android
npx cap sync android

# Step 3: Build APK
cd android
./gradlew assembleDebug

# Windows:
gradlew.bat assembleDebug
```

**Output Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Install Debug APK

```bash
# Install via ADB
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or copy to device and install manually
```

## 🚀 Building APK (Release)

Release APK for distribution outside Play Store:

### 1. Generate Signing Key

```bash
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Important:** Save this keystore file securely! You'll need it for all future updates.

### 2. Configure Signing

Create `android/keystore.properties`:

```properties
storePassword=your_keystore_password
keyPassword=your_key_password
keyAlias=my-key-alias
storeFile=../my-release-key.keystore
```

Add to `.gitignore`:
```
android/keystore.properties
my-release-key.keystore
```

### 3. Update build.gradle

Edit `android/app/build.gradle`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing config ...
    
    signingConfigs {
        release {
            if (keystorePropertiesFile.exists()) {
                keyAlias keystoreProperties['keyAlias']
                keyPassword keystoreProperties['keyPassword']
                storeFile file(keystoreProperties['storeFile'])
                storePassword keystoreProperties['storePassword']
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 4. Build Release APK

```bash
# Build web assets
npm run build

# Sync to Android
npx cap sync android

# Build signed APK
cd android
./gradlew assembleRelease

# Windows:
gradlew.bat assembleRelease
```

**Output Location:**
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📦 Building AAB (App Bundle for Play Store)

AAB is required for Google Play Store distribution:

```bash
# Build web assets
npm run build

# Sync to Android
npx cap sync android

# Build App Bundle
cd android
./gradlew bundleRelease

# Windows:
gradlew.bat bundleRelease
```

**Output Location:**
```
android/app/build/outputs/bundle/release/app-release.aab
```

## 🎨 App Configuration

### App Name and ID

Edit `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourgame',  // Change this!
  appName: 'My Game',                  // Change this!
  webDir: 'dist',
  // ...
};
```

Edit `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">My Game</string>
    <string name="title_activity_main">My Game</string>
</resources>
```

### App Icon

Replace these files in `android/app/src/main/res/`:

```
mipmap-hdpi/ic_launcher.png       (72x72)
mipmap-mdpi/ic_launcher.png       (48x48)
mipmap-xhdpi/ic_launcher.png      (96x96)
mipmap-xxhdpi/ic_launcher.png     (144x144)
mipmap-xxxhdpi/ic_launcher.png    (192x192)
```

Use online tools like [Icon Kitchen](https://icon.kitchen/) to generate all sizes.

### Splash Screen

Edit `android/app/src/main/res/values/styles.xml`:

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

Add splash screen image:
```
android/app/src/main/res/drawable/splash.png
```

## 🔍 Testing

### Test on Emulator

```bash
# Open Android Studio
npm run android

# Run from Android Studio or:
cd android
./gradlew installDebug
adb shell am start -n com.jsengine.game/.MainActivity
```

### Test on Physical Device

1. Enable **Developer Options** on your Android device:
   - Settings → About Phone → Tap "Build Number" 7 times

2. Enable **USB Debugging**:
   - Settings → Developer Options → USB Debugging

3. Connect device via USB

4. Install APK:
```bash
adb devices  # Verify device is connected
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## 📊 Optimization

### Reduce APK Size

1. **Enable ProGuard** (already configured in release builds)

2. **Use WebP for images** instead of PNG/JPG

3. **Enable APK splits** (multi-APK for different architectures):

```gradle
android {
    splits {
        abi {
            enable true
            reset()
            include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
            universalApk false
        }
    }
}
```

4. **Remove unused resources:**

```gradle
android {
    buildTypes {
        release {
            shrinkResources true
            minifyEnabled true
        }
    }
}
```

### Performance Tips

1. **Enable Hardware Acceleration** in `AndroidManifest.xml`:
```xml
<application android:hardwareAccelerated="true">
```

2. **Use WebGL 2.0** for better 3D performance

3. **Optimize assets** - compress textures, reduce polygon counts

4. **Use asset bundles** - load assets on-demand

## 🐛 Common Issues

### Issue: "SDK location not found"

**Solution:** Create `android/local.properties`:
```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### Issue: "Gradle build failed"

**Solution:**
```bash
cd android
./gradlew clean
./gradlew build --stacktrace
```

### Issue: "Unsigned APK"

**Solution:** Ensure signing config is set up correctly in `build.gradle`

### Issue: "App crashes on startup"

**Solution:** Check logs:
```bash
adb logcat | grep -i capacitor
```

## 📱 Distribution

### Google Play Store

1. Create a Google Play Console account ($25 one-time fee)
2. Upload AAB file (not APK)
3. Complete store listing
4. Submit for review

### Alternative Distribution

- **Direct Download** - Host APK on your website
- **Third-party stores** - Amazon Appstore, Samsung Galaxy Store
- **Beta testing** - Firebase App Distribution, TestFlight

## 🔒 Security

### Before Release:

1. **Remove debug code and console logs**
2. **Enable ProGuard** (code obfuscation)
3. **Secure API keys** - Use environment variables
4. **Test thoroughly** on multiple devices
5. **Backup keystore** - Store securely, you can't recover it!

## 📝 NPM Scripts Reference

```bash
npm run dev              # Development server
npm run build            # Build web app
npm run android:build    # Build and sync to Android
npm run android          # Open in Android Studio
npm run cap:sync         # Sync web app to native platforms
```

## 🎯 Quick Build Commands

**Development Testing:**
```bash
npm run build && npx cap sync android && cd android && ./gradlew installDebug
```

**Release APK:**
```bash
npm run build && npx cap sync android && cd android && ./gradlew assembleRelease
```

**Release AAB:**
```bash
npm run build && npx cap sync android && cd android && ./gradlew bundleRelease
```

---

**Need Help?**
- [Capacitor Android Docs](https://capacitorjs.com/docs/android)
- [Android Developer Guide](https://developer.android.com/guide)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)

