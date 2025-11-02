# GLTFJSX Integration Guide

This document explains the modular integration of [gltfjsx](https://github.com/pmndrs/gltfjsx) into the JS Game Engine, following industry standards and modern practices.

## 🎯 Why GLTFJSX?

### The Problem with Standard GLTF Loading

1. **Single Mount Limitation** - Three.js objects can only be mounted once, preventing re-use
2. **Traversal Overhead** - Finding nodes requires expensive scene traversal
3. **Mutation Issues** - Changes mutate source data, preventing re-use
4. **No Optimization** - Models often contain unnecessary nodes and unoptimized data
5. **Complex Workflow** - Restructuring, conditional rendering, and material changes are cumbersome

### The Solution: GLTFJSX

GLTFJSX converts GLTF/GLB files into reusable React Three Fiber JSX components with:
- ✅ Direct node/material access (no traversal)
- ✅ Multiple instance support
- ✅ Automatic optimization (Draco, meshopt)
- ✅ TypeScript support
- ✅ Animation handling
- ✅ Instancing for performance

## 🏗️ Architecture

### Interface-Based Design

The integration follows the engine's interface-based architecture:

```typescript
// Interface defines contract (no hard dependencies)
export interface IModelProcessor extends ISystem {
  processModel(path: string, options?: IModelProcessOptions): Promise<IProcessedModel>;
  generateComponent(path: string, options?: IModelProcessOptions): Promise<string>;
  // ...
}

// Implementation (can be swapped)
export class GLTFJSXProcessor implements IModelProcessor {
  // ...
}
```

### Modular Components

1. **IModelProcessor Interface** (`engine/interfaces/IModelProcessor.ts`)
   - Defines model processing contract
   - No hard dependencies on gltfjsx
   - Can be implemented by different processors

2. **GLTFJSXProcessor System** (`engine/systems/GLTFJSXProcessor.ts`)
   - Implements IModelProcessor
   - Lazy loads gltfjsx (reduces bundle size)
   - Handles optimization, compression, component generation

3. **GLTFModel Component** (`engine/components/GLTFModel.ts`)
   - Uses processed models
   - Integrates with Entity Component System
   - Auto-disposal and resource management

4. **Build Tools** (`tools/gltfjsx/process-models.js`)
   - Command-line tool for batch processing
   - Runs during build time
   - Generates optimized models and components

## 📦 Installation

```bash
npm install gltfjsx
```

## 🚀 Usage

### 1. Build-Time Processing (Recommended)

Process models during build for optimal performance:

```bash
# Process all models in assets/models
npm run process:models

# Process with optimization and types
npm run process:models:transform
```

This generates:
- Optimized `.glb` files (compressed, resized)
- TypeScript component files (`.tsx`)
- Ready-to-use React Three Fiber components

### 2. Runtime Processing

For dynamic model processing:

```typescript
import { GLTFJSXProcessor } from '@engine/index';

// Register processor with engine
const processor = new GLTFJSXProcessor();
engine.registerSystem(processor);

// Process a model
const result = await processor.processModel('/assets/models/character.glb', {
  transform: true,
  types: true,
  instance: true
});

// Use the processed model
const component = await processor.generateComponent('/assets/models/character.glb');
```

### 3. Using Processed Models

Once processed, use the GLTFModel component:

```typescript
import { Entity, GLTFModel, Transform } from '@engine/index';

// Create entity with processed model
const character = new Entity('Character');
character.addComponent(new Transform({ x: 0, y: 0, z: 0 }));
character.addComponent(new GLTFModel('/assets/models/processed/character-transformed.glb'));

// Add to scene
scene.addEntity(character);

// Reuse the same model multiple times (gltfjsx allows this!)
const character2 = new Entity('Character2');
character2.addComponent(new Transform({ x: 10, y: 0, z: 0 }));
character2.addComponent(new GLTFModel('/assets/models/processed/character-transformed.glb'));
scene.addEntity(character2);
```

### 4. Component-Based Usage (React)

If you generated React components:

```tsx
import { Character } from '../assets/models/processed/Character';

// Use directly in React Three Fiber
<Canvas>
  <Character position={[0, 0, 0]} />
  <Character position={[10, 0, 0]} scale={[2, 2, 2]} />
</Canvas>
```

## ⚙️ Processing Options

```typescript
interface IModelProcessOptions {
  draco?: boolean;           // Enable Draco compression
  dracoPath?: string;        // Draco decoder path
  meshopt?: boolean;         // Enable meshopt compression
  transform?: boolean;       // Auto-optimize (compression, resize)
  instance?: boolean;         // Create instances for similar geometry
  instanceAll?: boolean;      // Instance all geometry (max optimization)
  types?: boolean;            // Generate TypeScript types
  outputDir?: string;         // Output directory
  textureMaxSize?: number;    // Max texture dimension
  outputFormat?: 'jsx' | 'tsx' | 'component';
}
```

## 🎨 Benefits

### Performance

- **70-90% size reduction** with transform optimization
- **Reduced draw calls** with instancing
- **Faster loading** with compressed models
- **Better caching** with optimized assets

### Developer Experience

- **Direct access** to nodes and materials (no traversal)
- **Type safety** with TypeScript generation
- **Reusability** - mount models multiple times
- **Easy customization** - modify materials, add events
- **Animation support** - integrated animation handling

### Example: Before vs After

**Before (Standard GLTF):**
```typescript
// Can only mount once
const gltf = await loadGLTF('/model.glb');
scene.add(gltf.scene); // ❌ Can't reuse

// Must traverse to find nodes
gltf.scene.traverse((child) => {
  if (child.type === 'Mesh' && child.name === 'robot') {
    // Found it! But traversal is slow
  }
});
```

**After (GLTFJSX):**
```typescript
// Can mount multiple times
<Character position={[0, 0, 0]} />
<Character position={[10, 0, 0]} /> // ✅ Reusable!

// Direct access (no traversal)
const { nodes, materials } = useGLTF('/model-transformed.glb');
<nodes.robot geometry={nodes.robot.geometry} material={materials.metal} />
```

## 🔧 Integration Points

### With AssetManager

The GLTFJSXProcessor integrates seamlessly with AssetManager:

```typescript
// AssetManager loads the model
await assetManager.loadAsset('character', '/models/character.glb', 'model');

// GLTFJSXProcessor can optimize it
const processor = engine.getSystem<IModelProcessor>('GLTFJSXProcessor');
if (processor) {
  await processor.processModel('/models/character.glb', { transform: true });
}
```

### With Renderer

Processed models work automatically with the renderer:

```typescript
const gltfModel = entity.getComponent<GLTFModel>('GLTFModel');
if (gltfModel) {
  // Renderer automatically uses processed model
  // Better performance, instancing, etc.
}
```

## 📊 Best Practices

1. **Process at Build Time** - Run `npm run process:models` before building
2. **Use Transform Flag** - Enable optimization for production
3. **Enable Instancing** - For models with repeated geometry
4. **Generate Types** - For better TypeScript support
5. **Cache Processed Models** - Don't reprocess on every load

## 🔍 Industry Standards Followed

1. **Dependency Injection** - Interface-based, no hard dependencies
2. **Lazy Loading** - gltfjsx only loads when needed
3. **Error Handling** - Graceful fallbacks if processing fails
4. **Progress Tracking** - Status updates during processing
5. **Memory Efficiency** - Proper disposal and resource management
6. **Separation of Concerns** - Build-time vs runtime processing
7. **Type Safety** - TypeScript support throughout

## 📚 References

- [gltfjsx GitHub](https://github.com/pmndrs/gltfjsx)
- [gltfjsx Online Tool](https://gltf.pmnd.rs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

---

**The GLTFJSX integration provides a production-ready, optimized workflow for 3D models in the JS Game Engine.**

