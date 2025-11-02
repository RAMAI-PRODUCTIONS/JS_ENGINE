# ⚡ Quick Start - Build Everything

## 🎯 One Command to Rule Them All

Simply run:
```cmd
core\tools\bat\BUILD_ALL.cmd
```

Or from anywhere use npm:
```cmd
npm run build:all
```

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

### NPM Version (Recommended)
```cmd
npm run build:all
```

### Quick CMD (simpler output)
```cmd
core\tools\bat\BUILD_QUICK.cmd
```

## Development

For development with hot reload:
```cmd
npm run dev
```

## That's It!

Just run `npm run build:all` whenever you want to build everything! 🚀

See [BUILD_COMMANDS.md](./BUILD_COMMANDS.md) for all available commands.

