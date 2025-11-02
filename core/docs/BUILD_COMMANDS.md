# 🔨 Build Commands Reference

## Main Command (Use This!)

### Build Everything (Clean + Web + APK)
```cmd
core\tools\bat\BUILD_ALL.cmd
```

This is the **single command** that does everything:
- ✅ Cleans temp files
- ✅ Builds web app (date/time folder)
- ✅ Syncs to Android
- ✅ Builds APK

### Quick Alternative
```cmd
core\tools\bat\BUILD_QUICK.cmd
```
Same as above, simpler output.

## NPM Commands

### Build Everything
```cmd
npm run build:all
```

### Build Web Only
```cmd
npm run build
```

### Build APK Only (after web build)
```cmd
npm run android:apk
```

### Clean Temp Files
```cmd
npm run clean
```

### Clean All Builds
```cmd
npm run clean -- --all-builds
```

## What Gets Cleaned

The clean command removes:
- `dist/` folder
- `node_modules/.vite`
- `node_modules/.cache`
- `.vite` cache
- `.cache` folder
- Android build artifacts (`android/app/build/`, `.gradle/`)
- Log files (`*.log`)
- Temp files (`*.tmp`)

## Build Outputs

**Web Build:**
```
build/YYYYMMDD-HHMMSS/dist/
```

**APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Tips

- **First build:** Run `npm run build:all` (recommended)
- **After code changes:** Run `npm run build:all`
- **Quick web test:** Run `npm run build`
- **Free space:** Run `npm run clean -- --all-builds`

---

**Recommended:** Use `npm run build:all` - works from anywhere! 🚀

