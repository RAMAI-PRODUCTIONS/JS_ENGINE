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

- **[Engine Documentation](./ENGINE_README.md)** - Complete engine API and architecture guide
- **[Android Build Guide](./ANDROID_BUILD_GUIDE.md)** - Detailed Android setup and build instructions

## 📁 Project Structure

```
JS_ENGINE/
├── engine/          # Engine core (modular, interface-based)
├── game/            # Your game code
├── assets/          # Game assets
├── src/             # React application
├── android/         # Android project (generated)
└── ios/             # iOS project (generated)
```

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
- Check `game/scenes/MainScene.ts` for examples
- See `engine/interfaces/` for all available interfaces

## 🤝 Contributing

This engine uses an interface-based architecture. All systems communicate through interfaces, ensuring zero hard dependencies and maximum modularity.

## 📄 License

MIT License - Use freely for commercial and personal projects.

---

**Built with ❤️ using TypeScript + Three.js + React + Capacitor**
