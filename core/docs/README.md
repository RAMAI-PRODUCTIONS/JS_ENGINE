# JS Game Engine - Modular 3D Game Engine

A professional-grade, modular 3D game engine built with TypeScript, React Three Fiber, and Three.js. Features a complete Entity Component System (ECS), interface-based architecture, and Android/iOS export capabilities via Capacitor.

## 🌟 Features

- **Entity Component System (ECS)** - Modular, performant game object architecture
- **Interface-Based Design** - Zero hard references, fully decoupled systems
- **Modular Systems** - Plug-and-play architecture for all engine systems
- **TypeScript First** - Full type safety and IntelliSense support
- **Android Export** - Build APK and AAB files for Google Play Store
- **iOS Export** - Build IPA files (macOS required)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build for Android
npm run android:build
```

## 📚 Documentation

### Getting Started
- **[FOLDER_STRUCTURE_NEW.md](./FOLDER_STRUCTURE_NEW.md)** - Complete folder structure guide
- **[QUICK_START.md](./QUICK_START.md)** - Quick start guide
- **[MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)** - Recent structure migration details

### Core Documentation
- **[ENGINE_README.md](./ENGINE_README.md)** - Complete engine API and architecture guide
- **[BUILD_COMMANDS.md](./BUILD_COMMANDS.md)** - Quick reference for build commands
- **[BUILD_SYSTEM.md](./BUILD_SYSTEM.md)** - Detailed build system documentation

### Mobile & Assets
- **[ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md)** - Android setup and build instructions
- **[GLTFJSX_INTEGRATION.md](./GLTFJSX_INTEGRATION.md)** - Model optimization guide
- **[GLTFJSX_QUICK_START.md](./GLTFJSX_QUICK_START.md)** - Quick model processing guide

### Deployment
- **[GITHUB_PAGES_DEPLOY.md](./GITHUB_PAGES_DEPLOY.md)** - GitHub Pages deployment guide

## 📁 Project Structure

```
JS_ENGINE/
├── core/                    # 🎮 Engine Core (DO NOT MODIFY)
│   ├── engine/             # Complete ECS implementation
│   ├── assets/             # Shared engine assets
│   ├── tools/              # Build tools and scripts
│   ├── docs/               # All documentation
│   ├── code/               # Shared engine code (future)
│   └── shaders/            # Shared shaders (future)
│
├── project/                 # 🎯 Your Project (MODIFY FREELY)
│   ├── code/               # Game scenes & scripts
│   ├── assets/             # Game assets
│   └── shaders/            # Custom shaders
│
├── src/                     # ⚛️ React application
├── android/                 # 🤖 Android build
└── build/                   # 📦 Build outputs
```

See [FOLDER_STRUCTURE_NEW.md](./FOLDER_STRUCTURE_NEW.md) for complete details.

## 🎮 Core Systems

- **Renderer** - Three.js-based 3D rendering
- **Input** - Keyboard, mouse, touch, gamepad
- **Physics** - 3D physics simulation
- **Audio** - 2D and 3D spatial audio
- **Asset Manager** - Efficient asset loading and caching

## 📱 Mobile Export

### Android

```bash
# Add Android platform
npm run cap:add:android

# Build APK
npm run android:build
cd android
./gradlew assembleRelease

# Build AAB (for Play Store)
./gradlew bundleRelease
```

See [ANDROID_BUILD_GUIDE.md](./ANDROID_BUILD_GUIDE.md) for complete instructions.

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- For Android: Android Studio, JDK 17+, Android SDK
- For iOS: macOS, Xcode

### Scripts

```bash
npm run dev              # Development server
npm run build            # Build web app
npm run preview          # Preview production build
npm run android          # Open Android Studio
npm run android:build    # Build and sync to Android
npm run ios              # Open Xcode
```

## 🎯 Example Usage

```typescript
import { Engine, RendererSystem, Entity, Transform, Camera } from '@engine/index';

// Create engine
const engine = new Engine();
const renderer = new RendererSystem(canvas);
engine.registerSystem(renderer);

// Initialize
await engine.initialize({ canvas, width: 1920, height: 1080 });

// Create scene
const scene = new MainScene();
await engine.loadScene(scene);

// Start game loop
engine.start();
```

## 📖 Learn More

- Read [ENGINE_README.md](./ENGINE_README.md) for full documentation
- Check `project/code/scenes/MainScene.ts` for examples
- See `core/engine/interfaces/` for all available interfaces
- Explore [FOLDER_STRUCTURE_NEW.md](./FOLDER_STRUCTURE_NEW.md) for folder organization

## 🤝 Contributing

This engine uses an interface-based architecture. All systems communicate through interfaces, ensuring zero hard dependencies and maximum modularity.

## 📄 License

MIT License - Use freely for commercial and personal projects.

---

**Built with ❤️ using TypeScript + Three.js + React + Capacitor**
