# ⚡ Quick Start - Build Everything

## 🎯 One Command to Rule Them All

Simply run:
```cmd
BUILD_ALL.cmd
```

Or double-click `BUILD_ALL.cmd` in Windows Explorer!

## What Happens

This single command will:
1. 🧹 **Clean** all temporary files (dist, cache, Android build artifacts)
2. 📦 **Build** web app (creates date/time folder)
3. 🔄 **Sync** web app to Android project
4. 📱 **Build** Android APK (works on all devices)

## Output

**Web Build:**
```
build/20251102-143025/dist/
```

**APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Alternative Commands

### NPM Version
```cmd
npm run build:all
```

### Quick Version (simpler output)
```cmd
BUILD_QUICK.cmd
```

## That's It!

Just run `BUILD_ALL.cmd` whenever you want to build everything! 🚀

