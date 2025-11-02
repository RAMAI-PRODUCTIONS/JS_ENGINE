# JS Game Engine

A professional-grade, modular 3D game engine built with TypeScript, React Three Fiber, and Three.js. Features a complete Entity Component System (ECS), interface-based architecture, and Android/iOS export capabilities via Capacitor.

## 📁 Project Structure

```
JS_ENGINE/
├── core/                  # 🎮 Engine Core (DO NOT MODIFY)
│   ├── engine/           # Core engine implementation
│   ├── assets/           # Shared engine assets
│   ├── tools/            # Build tools and scripts
│   ├── docs/             # Engine documentation
│   ├── code/             # Shared engine code
│   └── shaders/          # Shared shaders
│
├── project/               # 🎯 Your Project (MODIFY FREELY)
│   ├── code/             # Game scenes & scripts
│   ├── assets/           # Game assets (meshes, textures, audio)
│   └── shaders/          # Custom shaders
│
├── src/                   # ⚛️ React application
├── android/               # 🤖 Android build
├── build/                 # 📦 Build outputs
└── node_modules/          # 📚 Dependencies
```

## 🚀 Quick Start

### Build Everything (Web + Android APK)
```cmd
core\tools\bat\BUILD_ALL.cmd
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

All documentation is in the `core/docs/` folder:

- **[README.md](core/docs/README.md)** - Main documentation
- **[ENGINE_README.md](core/docs/ENGINE_README.md)** - Engine API reference
- **[FOLDER_STRUCTURE_NEW.md](core/docs/FOLDER_STRUCTURE_NEW.md)** - Complete folder structure guide
- **[GLTFJSX_INTEGRATION.md](core/docs/GLTFJSX_INTEGRATION.md)** - GLTF model optimization guide
- **[QUICK_START.md](core/docs/QUICK_START.md)** - Quick start guide
- **[BUILD_COMMANDS.md](core/docs/BUILD_COMMANDS.md)** - Build commands reference
- **[ANDROID_BUILD_GUIDE.md](core/docs/ANDROID_BUILD_GUIDE.md)** - Android build guide
- **[BUILD_SYSTEM.md](core/docs/BUILD_SYSTEM.md)** - Build system documentation

## 🛠️ Tools & Scripts

### Batch Scripts (`core/tools/bat/`)
- `BUILD_ALL.cmd` - Build everything (clean + web + APK)
- `BUILD_QUICK.cmd` - Quick build
- `DEPLOY_JS_ENGINE.cmd` - Deploy to GitHub Pages

### Build Scripts (`core/tools/`)
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

- **Folder Structure:** [core/docs/FOLDER_STRUCTURE_NEW.md](core/docs/FOLDER_STRUCTURE_NEW.md) - Complete structure guide
- **Engine Docs:** [core/docs/ENGINE_README.md](core/docs/ENGINE_README.md)
- **Build Guide:** [core/docs/BUILD_COMMANDS.md](core/docs/BUILD_COMMANDS.md)
- **Android Setup:** [core/docs/ANDROID_BUILD_GUIDE.md](core/docs/ANDROID_BUILD_GUIDE.md)

## 📄 License

MIT License - Use freely for commercial and personal projects.

---

**Built with ❤️ using TypeScript + Three.js + React + Capacitor**

