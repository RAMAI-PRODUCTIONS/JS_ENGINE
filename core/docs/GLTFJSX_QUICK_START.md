# GLTFJSX Quick Start

Quick guide for using GLTFJSX integration in the JS Game Engine.

## ✅ Integration Complete

GLTFJSX has been integrated into the engine following industry standards:

- ✅ **Interface-based** - `IModelProcessor` interface (no hard dependencies)
- ✅ **Optional dependency** - Works with graceful fallback if gltfjsx not installed
- ✅ **Lazy loading** - Only loads when needed
- ✅ **Build-time tools** - CLI tools for processing models
- ✅ **Runtime processing** - Can process models at runtime if needed

## 🚀 Usage

### Option 1: Build-Time Processing (Recommended)

```bash
# Process all models in assets/models
npm run process:models

# Process with optimization
npm run process:models:transform
```

### Option 2: Runtime Processing

```typescript
import { GLTFJSXProcessor, Engine } from '@engine/index';

const engine = new Engine();
const processor = new GLTFJSXProcessor();
engine.registerSystem(processor);

// Process a model
const result = await processor.processModel('/models/character.glb', {
  transform: true,
  types: true
});
```

### Option 3: Use Processed Models

```typescript
import { Entity, GLTFModel, Transform } from '@engine/index';

const character = new Entity('Character');
character.addComponent(new Transform({ x: 0, y: 0, z: 0 }));
character.addComponent(new GLTFModel('/models/processed/character-transformed.glb'));
scene.addEntity(character);
```

## 📦 Installation (Optional)

GLTFJSX is optional - the system works without it but with limited features:

```bash
npm install gltfjsx --save-dev
```

## 📚 Full Documentation

See [GLTFJSX_INTEGRATION.md](GLTFJSX_INTEGRATION.md) for complete guide.

---

**The integration is complete and ready to use!**

