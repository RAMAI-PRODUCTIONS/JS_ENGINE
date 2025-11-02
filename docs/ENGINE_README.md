# JS Game Engine - Modular 3D Game Engine

A professional-grade, modular 3D game engine built with TypeScript, React Three Fiber, and Three.js. Features a complete Entity Component System (ECS), interface-based architecture, and Android/iOS export capabilities via Capacitor.

## 🎮 Features

### Engine Architecture
- **Entity Component System (ECS)** - Modular, performant game object architecture
- **Interface-Based Design** - Zero hard references, fully decoupled systems
- **Modular Systems** - Plug-and-play architecture for all engine systems
- **TypeScript First** - Full type safety and IntelliSense support

### Core Systems
- **Renderer System** - Three.js-based 3D rendering with shadows and post-processing
- **Input System** - Keyboard, mouse, touch, and gamepad support
- **Physics System** - 3D physics simulation (extensible for Cannon.js, Rapier, etc.)
- **Audio System** - 2D and 3D spatial audio using Web Audio API
- **Asset Manager** - Efficient loading and caching of game assets

### Components
- **Transform** - Position, rotation, scale
- **MeshRenderer** - 3D mesh rendering
- **Camera** - Perspective camera
- **Light** - Directional, point, spot, and ambient lighting
- **Script** - Custom game logic base class

### Export Targets
- **Web** - Progressive Web App (PWA)
- **Android** - APK and AAB builds
- **iOS** - IPA builds (macOS required)

## 📁 Project Structure

```
JS_ENGINE/
├── engine/                    # Engine core (DO NOT modify for games)
│   ├── core/                  # Core engine classes
│   │   ├── Engine.ts          # Main engine class
│   │   ├── Entity.ts          # Entity implementation
│   │   └── Scene.ts           # Scene implementation
│   ├── interfaces/            # All engine interfaces
│   │   ├── IEngine.ts
│   │   ├── ISystem.ts
│   │   ├── IComponent.ts
│   │   ├── IEntity.ts
│   │   ├── IScene.ts
│   │   ├── IRenderer.ts
│   │   ├── IInput.ts
│   │   ├── IPhysics.ts
│   │   ├── IAudio.ts
│   │   └── IAssetManager.ts
│   ├── systems/               # System implementations
│   │   ├── RendererSystem.ts
│   │   ├── InputSystem.ts
│   │   ├── PhysicsSystem.ts
│   │   ├── AudioSystem.ts
│   │   └── AssetManagerSystem.ts
│   ├── components/            # Built-in components
│   │   ├── Transform.ts
│   │   ├── MeshRenderer.ts
│   │   ├── Camera.ts
│   │   ├── Light.ts
│   │   └── Script.ts
│   ├── utils/                 # Engine utilities
│   │   └── IdGenerator.ts
│   └── index.ts               # Engine public API
│
├── game/                      # Your game code (modify freely)
│   ├── scenes/                # Game scenes
│   │   └── MainScene.ts
│   └── scripts/               # Custom game scripts
│       └── RotateScript.ts
│
├── assets/                    # Game assets
│   ├── models/                # 3D models (.gltf, .glb)
│   ├── textures/              # Textures and images
│   ├── audio/                 # Sound effects and music
│   └── shaders/               # Custom shaders
│
├── src/                       # React application
│   ├── App.tsx                # Main app component
│   └── main.jsx               # Entry point
│
├── android/                   # Android project (generated)
├── ios/                       # iOS project (generated)
└── dist/                      # Build output
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **For Android builds:**
  - Android Studio
  - Android SDK (API Level 33+)
  - Java Development Kit (JDK) 17+
  - Gradle 8+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your game running.

## 🎯 Creating Your First Game

### 1. Create a Scene

```typescript
// game/scenes/GameScene.ts
import { Scene, Entity, Transform, Camera, Light } from '@engine/index';

export class GameScene extends Scene {
  constructor() {
    super('GameScene');
  }

  async load(): Promise<void> {
    await super.load();

    // Create camera
    const camera = new Entity('Camera');
    camera.addComponent(new Transform({ x: 0, y: 5, z: 10 }));
    camera.addComponent(new Camera());
    this.addEntity(camera);

    // Create light
    const light = new Entity('Light');
    light.addComponent(new Transform({ x: 0, y: 10, z: 0 }));
    light.addComponent(new Light('directional'));
    this.addEntity(light);

    // Create your game objects...
  }
}
```

### 2. Create Custom Scripts

```typescript
// game/scripts/PlayerController.ts
import { Script, Transform } from '@engine/index';

export class PlayerController extends Script {
  private transform: Transform | null = null;
  private speed = 5.0;

  protected onStart(): void {
    this.transform = this.getComponent<Transform>('Transform');
  }

  protected update(deltaTime: number): void {
    if (!this.transform) return;

    // Get input from engine
    const input = (this as any).engine?.input;
    if (!input) return;

    // Move player
    if (input.isKeyDown('w')) {
      this.transform.position.z -= this.speed * deltaTime;
    }
    if (input.isKeyDown('s')) {
      this.transform.position.z += this.speed * deltaTime;
    }
    if (input.isKeyDown('a')) {
      this.transform.position.x -= this.speed * deltaTime;
    }
    if (input.isKeyDown('d')) {
      this.transform.position.x += this.speed * deltaTime;
    }
  }
}
```

### 3. Use Components

```typescript
// Create a game entity
const player = new Entity('Player');
player.addComponent(new Transform({ x: 0, y: 0, z: 0 }));
player.addComponent(new MeshRenderer('playerModel', 'playerMaterial'));
player.addComponent(new PlayerController());
player.tags.add('player');

scene.addEntity(player);
```

## 📱 Building for Android

### Setup Android (First Time Only)

```bash
# Add Android platform
npm run cap:add:android

# This will create the android/ directory
```

### Configure Android

1. Open `android/app/build.gradle`
2. Set minimum SDK version:
```gradle
android {
    compileSdkVersion 34
    defaultConfig {
        applicationId "com.jsengine.game"
        minSdkVersion 22
        targetSdkVersion 34
        // ... rest of config
    }
}
```

### Build APK

```bash
# Development build
npm run android:build
cd android
./gradlew assembleDebug

# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Build AAB (Release)

```bash
# Build for Play Store
npm run android:build
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Open in Android Studio

```bash
npm run android
```

## 🎨 Engine Systems API

### Engine

```typescript
import { Engine } from '@engine/index';

const engine = new Engine();
await engine.initialize(config);
engine.start();

// Access systems
const input = engine.input;
const physics = engine.physics;
const audio = engine.audio;
const assets = engine.assets;
```

### Input System

```typescript
// Keyboard
if (engine.input.isKeyDown('space')) { /* ... */ }
if (engine.input.isKeyPressed('e')) { /* ... */ }

// Mouse
const mousePos = engine.input.getMousePosition();
const mouseDelta = engine.input.getMouseDelta();
if (engine.input.isMouseButtonDown(0)) { /* ... */ }

// Action Mapping
engine.input.mapAction('jump', ['space', 'w']);
if (engine.input.isActionPressed('jump')) { /* ... */ }

// Touch
const touches = engine.input.getTouches();
```

### Physics System

```typescript
// Create rigid body
const body = engine.physics.createRigidBody(entityId, mass, false);
body.applyForce({ x: 0, y: 100, z: 0 });

// Raycasting
const hit = engine.physics.raycast(
  { x: 0, y: 0, z: 0 },
  { x: 0, y: -1, z: 0 },
  100
);

// Collision callbacks
engine.physics.onCollisionEnter((collision) => {
  console.log('Collision!', collision);
});
```

### Audio System

```typescript
// Load audio
await engine.audio.loadAudio('bgm', '/assets/audio/music.mp3');
await engine.audio.loadAudio('jump', '/assets/audio/jump.wav');

// Play 2D sound
engine.audio.playSound('jump', 1.0, false);

// Play 3D positional audio
engine.audio.playSound3D('explosion', x, y, z, 1.0, false);

// Play music
engine.audio.playMusic('bgm', 0.5);

// Volume control
engine.audio.masterVolume = 0.8;
engine.audio.musicVolume = 0.6;
engine.audio.sfxVolume = 1.0;
```

### Asset Manager

```typescript
// Load single asset
await engine.assets.loadAsset('model1', '/assets/models/character.glb', 'model');

// Load multiple assets
await engine.assets.loadAssets([
  { id: 'tex1', url: '/assets/textures/wall.jpg', type: 'texture' },
  { id: 'model1', url: '/assets/models/tree.glb', type: 'model' },
  { id: 'audio1', url: '/assets/audio/ambient.mp3', type: 'audio' }
]);

// Get loaded asset
const model = engine.assets.getAsset('model1');

// Memory management
const usage = engine.assets.getMemoryUsage();
console.log(`Total assets: ${usage.assetCount}, Size: ${usage.totalSize} bytes`);
```

## 🔧 Advanced Features

### Creating Custom Systems

```typescript
import { ISystem } from '@engine/interfaces/ISystem';

export class CustomSystem implements ISystem {
  public readonly name = 'CustomSystem';
  public readonly priority = 50;
  public enabled = true;

  async initialize(): Promise<void> {
    // Setup system
  }

  update(deltaTime: number): void {
    // Update every frame
  }

  dispose(): void {
    // Cleanup
  }
}

// Register with engine
engine.registerSystem(new CustomSystem());
```

### Creating Custom Components

```typescript
import { IComponent } from '@engine/interfaces/IComponent';

export class HealthComponent implements IComponent {
  public readonly id = generateId();
  public readonly type = 'Health';
  public entityId = '';
  public enabled = true;

  public maxHealth = 100;
  public currentHealth = 100;

  takeDamage(amount: number): void {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
  }

  heal(amount: number): void {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
  }

  serialize() {
    return { type: this.type, maxHealth: this.maxHealth, currentHealth: this.currentHealth };
  }

  deserialize(data: any) {
    this.maxHealth = data.maxHealth;
    this.currentHealth = data.currentHealth;
  }
}
```

## 📊 Performance Tips

1. **Use Object Pooling** - Reuse entities instead of creating/destroying
2. **Batch Draw Calls** - Combine similar meshes
3. **Limit Physics Updates** - Use fixed time step for physics
4. **LOD System** - Use level-of-detail for distant objects
5. **Frustum Culling** - Don't render off-screen objects
6. **Asset Compression** - Use compressed textures and models
7. **Code Splitting** - Load assets on-demand

## 🏗️ Architecture Principles

### 1. Interface-Based Design
All systems communicate through interfaces, ensuring zero hard dependencies:

```typescript
// ❌ BAD: Hard dependency
import { RendererSystem } from './systems/RendererSystem';

// ✅ GOOD: Interface dependency
import { IRenderer } from './interfaces/IRenderer';
```

### 2. Dependency Injection
Systems are injected into the engine, not imported directly:

```typescript
const renderer = new RendererSystem(canvas);
engine.registerSystem(renderer);

// Access via engine
const renderer = engine.getSystem<IRenderer>('Renderer');
```

### 3. Single Responsibility
Each system handles one concern:
- Renderer → Rendering
- Input → Input handling
- Physics → Physics simulation
- Audio → Audio playback

### 4. Entity Component System
- **Entities** - Containers with ID and hierarchy
- **Components** - Data and behavior
- **Systems** - Process components

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/)

## 🤝 Contributing

This is a game engine template. Modify the `game/` directory for your game, but avoid changing `engine/` core files unless adding engine features.

## 📄 License

MIT License - Feel free to use for commercial and personal projects.

---

**Built with ❤️ using TypeScript + Three.js + React + Capacitor**

