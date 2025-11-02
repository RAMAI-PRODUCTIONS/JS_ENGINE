/**
 * Main Engine Export
 * Export all public APIs for the game engine
 */

// Core
export { Engine } from './core/Engine';
export { Entity } from './core/Entity';
export { Scene } from './core/Scene';

// Interfaces
export type { IEngine, IEngineConfig } from './interfaces/IEngine';
export type { ISystem } from './interfaces/ISystem';
export type { IComponent } from './interfaces/IComponent';
export type { IEntity } from './interfaces/IEntity';
export type { IScene } from './interfaces/IScene';
export type { IRenderer } from './interfaces/IRenderer';
export type { IInput } from './interfaces/IInput';
export type { IPhysics, IRigidBody, ICollider, Vector3, Quaternion } from './interfaces/IPhysics';
export type { IAudio, IAudioSource } from './interfaces/IAudio';
export type { IAssetManager, AssetType, IAsset } from './interfaces/IAssetManager';

// Systems
export { RendererSystem } from './systems/RendererSystem';
export { InputSystem } from './systems/InputSystem';
export { PhysicsSystem } from './systems/PhysicsSystem';
export { AudioSystem } from './systems/AudioSystem';
export { AssetManagerSystem } from './systems/AssetManagerSystem';

// Components
export { Transform } from './components/Transform';
export { MeshRenderer } from './components/MeshRenderer';
export { Camera } from './components/Camera';
export { Light } from './components/Light';
export { Script } from './components/Script';

// Utils
export { generateId, generateUUID } from './utils/IdGenerator';

