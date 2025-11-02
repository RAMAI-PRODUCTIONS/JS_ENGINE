# 🚀 Build Commands - Quick Reference

## Single Command to Build Everything

### Option 1: CMD File (Easiest)
Just double-click or run:
```cmd
BUILD_ALL.cmd
```

### Option 2: Quick CMD
```cmd
BUILD_QUICK.cmd
```

### Option 3: NPM Command
```cmd
npm run build:all
```

## What It Does

The `build:all` command automatically:
1. ✅ **Cleans** all temporary files
2. ✅ **Builds** web app (into date/time folder)
3. ✅ **Syncs** to Android
4. ✅ **Builds** Android APK

## Output Locations

**Web Build:**
```
build/YYYYMMDD-HHMMSS/dist/
```

**APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Other Useful Commands

### Clean Only
```cmd
npm run clean
```

### Build Web Only
```cmd
npm run build
```

### Build APK Only (after web build)
```cmd
npm run android:apk
```

### Clean Everything (including all builds)
```cmd
npm run clean -- --all-builds
```

## Quick Tips

- **First time:** Run `BUILD_ALL.cmd` to build everything
- **After code changes:** Run `npm run build:all` for fresh build
- **Quick test:** Use `npm run build` for web build only
- **Clean space:** Use `npm run clean -- --all-builds` to remove all build folders

---

**That's it!** Just run `BUILD_ALL.cmd` and everything builds automatically! 🎉

