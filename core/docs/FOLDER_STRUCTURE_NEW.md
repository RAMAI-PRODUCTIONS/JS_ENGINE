# 📁 JS_ENGINE Folder Structure

## Overview

The JS_ENGINE follows an industry-standard folder structure similar to Unreal Engine, with a clear separation between core engine functionality and project-specific content.

```
JS_ENGINE/
├── core/                    # 🎮 Engine Core (DO NOT MODIFY)
│   ├── engine/             # Core engine implementation
│   ├── assets/             # Shared engine assets
│   ├── tools/              # Build tools and scripts
│   ├── docs/               # Engine documentation
│   ├── code/               # Shared engine code (plugins, utilities)
│   └── shaders/            # Shared shaders
│
├── project/                 # 🎯 Your Project (MODIFY FREELY)
│   ├── code/               # Project-specific code
│   ├── assets/             # Project-specific assets
│   └── shaders/            # Project-specific shaders
│
├── src/                     # ⚛️ React Application Entry
├── android/                 # 🤖 Android Build
├── build/                   # 📦 Build Outputs
├── node_modules/            # 📚 Dependencies
├── package.json             # NPM Configuration
├── tsconfig.json            # TypeScript Configuration
├── vite.config.js           # Vite Configuration
├── capacitor.config.ts      # Capacitor Configuration
└── index.html               # Entry HTML
```

---

## 🎮 Core Folder (`core/`)

The core folder contains all engine-related code and assets that should NOT be modified during game development. Only modify core if you're adding engine features.

### `core/engine/` - Engine Implementation

Complete Entity Component System (ECS) with modular architecture:

```
core/engine/
├── core/                    # Core engine classes
│   ├── Engine.ts           # Main engine class
│   ├── Entity.ts           # Entity implementation
│   └── Scene.ts            # Scene implementation
│
├── systems/                 # System implementations
│   ├── RendererSystem.ts   # Rendering system
│   ├── InputSystem.ts      # Input handling
│   ├── PhysicsSystem.ts    # Physics simulation
│   ├── AudioSystem.ts      # Audio system
│   ├── AssetManagerSystem.ts
│   └── GLTFJSXProcessor.ts # Model processor
│
├── components/              # Built-in components
│   ├── Transform.ts        # Position, rotation, scale
│   ├── MeshRenderer.ts     # Mesh rendering
│   ├── Camera.ts           # Camera component
│   ├── Light.ts            # Lighting component
│   ├── Script.ts           # Script base class
│   └── GLTFModel.ts        # GLTF model component
│
├── interfaces/              # All engine interfaces
│   ├── IEngine.ts
│   ├── ISystem.ts
│   ├── IComponent.ts
│   ├── IEntity.ts
│   ├── IScene.ts
│   ├── IRenderer.ts
│   ├── IInput.ts
│   ├── IPhysics.ts
│   ├── IAudio.ts
│   ├── IAssetManager.ts
│   └── IModelProcessor.ts
│
├── utils/                   # Utilities
│   └── IdGenerator.ts      # ID generation
│
└── index.ts                 # Main engine export
```

**Usage:**
```typescript
import { Engine, RendererSystem, Entity } from '../core/engine';
```

### `core/assets/` - Shared Engine Assets

Reusable assets for the engine and framework:

```
core/assets/
├── meshes/                  # Shared 3D models (primitives, etc.)
├── textures/                # Shared textures (UI, debug, etc.)
├── animations/              # Shared animations
└── audio/                   # Shared audio files (UI sounds, etc.)
```

**When to use:** Place assets here that will be used across multiple projects or are part of the engine itself.

### `core/tools/` - Build Tools and Scripts

Development tools and build system:

```
core/tools/
├── build.js                 # Main build script
├── clean.js                 # Cleanup script
├── build-utils.js           # Build utilities
├── bat/                     # Windows batch scripts
│   ├── BUILD_ALL.cmd       # Build everything
│   ├── BUILD_QUICK.cmd     # Quick build
│   ├── BUILD.cmd           # Standard build
│   └── DEPLOY_JS_ENGINE.cmd
└── gltfjsx/                 # GLTF processing tools
    └── process-models.js
```

### `core/docs/` - Engine Documentation

Complete engine documentation:

```
core/docs/
├── README.md                # Main docs
├── ENGINE_README.md         # Engine API reference
├── QUICK_START.md           # Quick start guide
├── BUILD_COMMANDS.md        # Build commands
├── BUILD_SYSTEM.md          # Build system docs
├── ANDROID_BUILD_GUIDE.md   # Android guide
├── GLTFJSX_INTEGRATION.md   # Model optimization
└── FOLDER_STRUCTURE_NEW.md  # This document
```

### `core/code/` - Shared Engine Code

Shared code like plugins, utilities, and extensions:

```
core/code/
├── plugins/                 # Engine plugins (future)
├── utilities/               # Shared utilities (future)
└── extensions/              # Engine extensions (future)
```

**Purpose:** Place reusable code here that extends the engine but isn't core functionality.

### `core/shaders/` - Shared Shaders

Shared shader files for the engine:

```
core/shaders/
├── post-processing/         # Post-processing shaders (future)
├── materials/               # Shared materials (future)
└── utilities/               # Shader utilities (future)
```

---

## 🎯 Project Folder (`project/`)

Your game-specific content. Modify freely!

### `project/code/` - Project Code

All your game logic, scenes, and scripts:

```
project/code/
├── scenes/                  # Game scenes
│   ├── MainScene.ts        # Main game scene
│   ├── MenuScene.ts        # Menu scene
│   └── GameOverScene.ts    # Game over scene
│
├── scripts/                 # Custom scripts
│   ├── RotateScript.ts     # Rotation script
│   ├── PlayerController.ts # Player control
│   └── EnemyAI.ts          # Enemy AI
│
├── managers/                # Game managers (future)
│   ├── LevelManager.ts     # Level management
│   ├── SaveManager.ts      # Save/load system
│   └── UI Manager.ts       # UI management
│
└── data/                    # Game data (future)
    ├── levels.json         # Level definitions
    └── config.json         # Game configuration
```

**Usage:**
```typescript
import { MainScene } from '../project/code/scenes/MainScene';
import { PlayerController } from '../project/code/scripts/PlayerController';
```

### `project/assets/` - Project Assets

All assets specific to your game:

```
project/assets/
├── meshes/                  # Game-specific 3D models
│   ├── characters/         # Character models
│   ├── props/              # Props and objects
│   ├── environment/        # Environment models
│   └── UI/                 # UI meshes
│
├── textures/                # Game-specific textures
│   ├── characters/         # Character textures
│   ├── environment/        # Environment textures
│   ├── UI/                 # UI textures
│   └── effects/            # Effect textures
│
├── animations/              # Game-specific animations
│   ├── characters/         # Character animations
│   └── effects/            # Effect animations
│
└── audio/                   # Game-specific audio
    ├── music/              # Background music
    ├── sfx/                # Sound effects
    └── voice/              # Voice acting
```

**Guidelines:**
- Place ALL game-specific assets here
- Organize by category and subcategory
- Keep naming consistent

### `project/shaders/` - Project Shaders

Custom shaders for your project:

```
project/shaders/
├── materials/               # Custom materials
│   ├── water.glsl         # Water shader
│   └── lava.glsl          # Lava shader
│
├── effects/                 # Effect shaders
│   ├── explode.glsl       # Explosion effect
│   └── teleport.glsl      # Teleport effect
│
└── post-processing/         # Post-processing
    ├── blur.glsl          # Blur effect
    └── colorGrade.glsl    # Color grading
```

---

## ⚛️ Source Folder (`src/`)

React application entry point:

```
src/
├── App.tsx                  # Main app component
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

**Note:** This is the bridge between React and the engine.

---

## 📦 Build Configuration

### Import Paths

Configured in `tsconfig.json` and `vite.config.js`:

```json
{
  "paths": {
    "@engine/*": ["core/engine/*"],
    "@game/*": ["project/code/*"],
    "@assets/*": ["project/assets/*"]
  }
}
```

**Usage:**
```typescript
import { Engine } from '@engine/index';
import { MainScene } from '@game/scenes/MainScene';
```

### Build Scripts

All scripts in `package.json` point to `core/tools/`:

```json
{
  "scripts": {
    "build": "node core/tools/build.js",
    "clean": "node core/tools/clean.js",
    "process:models": "node core/tools/gltfjsx/process-models.js"
  }
}
```

---

## 🔄 Migration Guide

### Old Structure → New Structure

| Old Path | New Path |
|----------|----------|
| `engine/` | `core/engine/` |
| `game/` | `project/code/` |
| `assets/` | `project/assets/` or `core/assets/` |
| `tools/` | `core/tools/` |
| `scripts/` | `core/tools/` |
| `docs/` | `core/docs/` |

### Updated Imports

**Before:**
```typescript
import { Engine } from '../engine/index';
import { MainScene } from '../game/scenes/MainScene';
```

**After:**
```typescript
import { Engine } from '../core/engine/index';
import { MainScene } from '../project/code/scenes/MainScene';
```

---

## 📝 Best Practices

### ✅ DO

1. **Modify freely in `project/`** - This is YOUR game
2. **Keep engine code in `core/engine/`** - Only modify when adding engine features
3. **Organize assets** - Use subfolders by category
4. **Use shared assets** - Put reusable assets in `core/assets/`
5. **Document changes** - Keep `core/docs/` updated

### ❌ DON'T

1. **Don't modify `core/engine/`** unless adding engine features
2. **Don't mix core and project** - Keep them separate
3. **Don't commit build outputs** - Use `.gitignore`
4. **Don't hardcode paths** - Use aliases (`@engine`, `@game`, `@assets`)
5. **Don't duplicate assets** - Share via `core/assets/`

---

## 🎯 Quick Reference

### Where to put things:

| Content | Location |
|---------|----------|
| Game scenes | `project/code/scenes/` |
| Game scripts | `project/code/scripts/` |
| Game models | `project/assets/meshes/` |
| Game textures | `project/assets/textures/` |
| Engine code | `core/engine/` (don't modify) |
| Shared assets | `core/assets/` |
| Build tools | `core/tools/` |
| Documentation | `core/docs/` |

### Import examples:

```typescript
// Engine imports
import { Engine, Entity, Scene } from '../core/engine';

// Game imports
import { MainScene } from '../project/code/scenes/MainScene';

// Asset imports (relative to project)
import meshUrl from '../project/assets/meshes/character.glb';
```

---

## 📚 Further Reading

- [Engine API Reference](./ENGINE_README.md)
- [Quick Start Guide](./QUICK_START.md)
- [Build System](./BUILD_SYSTEM.md)
- [Android Build Guide](./ANDROID_BUILD_GUIDE.md)

---

**Last Updated:** November 2025  
**Version:** 1.0.0

