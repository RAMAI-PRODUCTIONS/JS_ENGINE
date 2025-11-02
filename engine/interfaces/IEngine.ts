import { ISystem } from './ISystem';
import { IScene } from './IScene';
import { IRenderer } from './IRenderer';
import { IInput } from './IInput';
import { IPhysics } from './IPhysics';
import { IAudio } from './IAudio';
import { IAssetManager } from './IAssetManager';

/**
 * Engine configuration
 */
export interface IEngineConfig {
  canvas?: HTMLCanvasElement;
  width?: number;
  height?: number;
  pixelRatio?: number;
  physics?: {
    enabled: boolean;
    gravity?: { x: number; y: number; z: number };
  };
  audio?: {
    enabled: boolean;
  };
  debug?: boolean;
}

/**
 * Main Engine interface
 * Core of the game engine that manages all systems
 */
export interface IEngine {
  /**
   * Engine version
   */
  readonly version: string;

  /**
   * Whether the engine is running
   */
  readonly isRunning: boolean;

  /**
   * Current frames per second
   */
  readonly fps: number;

  /**
   * Delta time in seconds
   */
  readonly deltaTime: number;

  /**
   * Total elapsed time since engine start
   */
  readonly totalTime: number;

  /**
   * Initialize the engine
   */
  initialize(config: IEngineConfig): Promise<void>;

  /**
   * Start the engine (begin game loop)
   */
  start(): void;

  /**
   * Stop the engine
   */
  stop(): void;

  /**
   * Pause the engine
   */
  pause(): void;

  /**
   * Resume the engine
   */
  resume(): void;

  /**
   * Register a system with the engine
   */
  registerSystem(system: ISystem): void;

  /**
   * Get a system by name
   */
  getSystem<T extends ISystem>(name: string): T | null;

  /**
   * Remove a system
   */
  removeSystem(name: string): void;

  /**
   * Get core systems (convenience methods)
   */
  readonly renderer: IRenderer;
  readonly input: IInput;
  readonly physics: IPhysics;
  readonly audio: IAudio;
  readonly assets: IAssetManager;

  /**
   * Load a scene
   */
  loadScene(scene: IScene): Promise<void>;

  /**
   * Get the current active scene
   */
  getCurrentScene(): IScene | null;

  /**
   * Set target frame rate (0 = unlimited)
   */
  setTargetFrameRate(fps: number): void;

  /**
   * Set time scale (for slow motion / fast forward)
   */
  setTimeScale(scale: number): void;

  /**
   * Get engine configuration
   */
  getConfig(): IEngineConfig;

  /**
   * Destroy the engine and clean up all resources
   */
  dispose(): void;
}

