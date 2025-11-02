# JS Game Engine

A professional-grade, modular 3D game engine built with TypeScript, React Three Fiber, and Three.js. Features a complete Entity Component System (ECS), interface-based architecture, and Android/iOS export capabilities via Capacitor.

## 📁 Project Structure

```
JS_ENGINE/
├── docs/                  # 📚 All documentation
├── tools/                 # 🛠️ Build tools and scripts
│   └── bat/              # Batch scripts (.cmd files)
├── scripts/              # 🔧 JavaScript build scripts
├── engine/               # 🎮 Engine core (modular, interface-based)
├── game/                # 🎯 Your game code
├── assets/               # 📦 Game assets
├── src/                  # ⚛️ React application
└── build/                # 📦 Build outputs (date/time folders)
```

## 🚀 Quick Start

### Build Everything (Web + Android APK)
```cmd
tools\bat\BUILD_ALL.cmd
```

Or use the shortcut:
```cmd
npm run build:all
```

### Development
```bash
npm run dev
```

### Other Commands
```bash
npm run build          # Build web app
npm run android:apk    # Build APK only
npm run clean          # Clean temp files
```

## 📚 Documentation

All documentation is in the `docs/` folder:

- **[README.md](docs/README.md)** - Main documentation
- **[ENGINE_README.md](docs/ENGINE_README.md)** - Engine API reference
- **[QUICK_START.md](docs/QUICK_START.md)** - Quick start guide
- **[BUILD_COMMANDS.md](docs/BUILD_COMMANDS.md)** - Build commands reference
- **[ANDROID_BUILD_GUIDE.md](docs/ANDROID_BUILD_GUIDE.md)** - Android build guide
- **[BUILD_SYSTEM.md](docs/BUILD_SYSTEM.md)** - Build system documentation

## 🛠️ Tools & Scripts

### Batch Scripts (`tools/bat/`)
- `BUILD_ALL.cmd` - Build everything (clean + web + APK)
- `BUILD_QUICK.cmd` - Quick build
- `DEPLOY_JS_ENGINE.cmd` - Deploy to GitHub Pages

### Build Scripts (`scripts/`)
- `build.js` - Main build script (date/time folders)
- `clean.js` - Cleanup script
- `build-utils.js` - Build utilities

## 🎮 Features

- **Entity Component System (ECS)** - Modular game object architecture
- **Interface-Based Design** - Zero hard references
- **Modular Systems** - Renderer, Input, Physics, Audio, AssetManager
- **TypeScript First** - Full type safety
- **Android Export** - Build APK/AAB files
- **iOS Export** - Build IPA files (macOS required)

## 📦 Build Outputs

**Web Build:**
```
build/YYYYMMDD-HHMMSS/dist/
```

**APK:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 🔗 Quick Links

- **Engine Docs:** [docs/ENGINE_README.md](docs/ENGINE_README.md)
- **Build Guide:** [docs/BUILD_COMMANDS.md](docs/BUILD_COMMANDS.md)
- **Android Setup:** [docs/ANDROID_BUILD_GUIDE.md](docs/ANDROID_BUILD_GUIDE.md)

## 📄 License

MIT License - Use freely for commercial and personal projects.

---

**Built with ❤️ using TypeScript + Three.js + React + Capacitor**

