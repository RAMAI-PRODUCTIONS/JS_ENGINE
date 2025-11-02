import { IEngine, IEngineConfig } from '../interfaces/IEngine';
import { ISystem } from '../interfaces/ISystem';
import { IScene } from '../interfaces/IScene';
import { IRenderer } from '../interfaces/IRenderer';
import { IInput } from '../interfaces/IInput';
import { IPhysics } from '../interfaces/IPhysics';
import { IAudio } from '../interfaces/IAudio';
import { IAssetManager } from '../interfaces/IAssetManager';

/**
 * Main Engine class
 * Coordinates all systems and manages the game loop
 */
export class Engine implements IEngine {
  public readonly version: string = '1.0.0';
  public isRunning: boolean = false;
  public fps: number = 0;
  public deltaTime: number = 0;
  public totalTime: number = 0;

  private systems: Map<string, ISystem> = new Map();
  private currentScene: IScene | null = null;
  private config: IEngineConfig = {};
  
  private lastTime: number = 0;
  private frameCount: number = 0;
  private fpsTimer: number = 0;
  private animationFrameId: number = 0;
  private isPaused: boolean = false;
  private timeScale: number = 1.0;
  private targetFrameRate: number = 0;
  private targetFrameTime: number = 0;

  async initialize(config: IEngineConfig): Promise<void> {
    this.config = config;
    
    // Initialize all registered systems
    const sortedSystems = Array.from(this.systems.values())
      .sort((a, b) => a.priority - b.priority);
    
    for (const system of sortedSystems) {
      await system.initialize();
    }
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.isPaused = false;
    this.lastTime = performance.now();
    this.gameLoop();
  }

  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
    this.lastTime = performance.now();
  }

  registerSystem(system: ISystem): void {
    this.systems.set(system.name, system);
  }

  getSystem<T extends ISystem>(name: string): T | null {
    return (this.systems.get(name) as T) || null;
  }

  removeSystem(name: string): void {
    const system = this.systems.get(name);
    if (system) {
      system.dispose();
      this.systems.delete(name);
    }
  }

  get renderer(): IRenderer {
    return this.getSystem<IRenderer>('Renderer')!;
  }

  get input(): IInput {
    return this.getSystem<IInput>('Input')!;
  }

  get physics(): IPhysics {
    return this.getSystem<IPhysics>('Physics')!;
  }

  get audio(): IAudio {
    return this.getSystem<IAudio>('Audio')!;
  }

  get assets(): IAssetManager {
    return this.getSystem<IAssetManager>('AssetManager')!;
  }

  async loadScene(scene: IScene): Promise<void> {
    // Unload current scene
    if (this.currentScene) {
      this.currentScene.onDeactivate();
      await this.currentScene.unload();
    }
    
    // Load new scene
    await scene.load();
    scene.onActivate();
    this.currentScene = scene;
  }

  getCurrentScene(): IScene | null {
    return this.currentScene;
  }

  setTargetFrameRate(fps: number): void {
    this.targetFrameRate = fps;
    this.targetFrameTime = fps > 0 ? 1000 / fps : 0;
  }

  setTimeScale(scale: number): void {
    this.timeScale = Math.max(0, scale);
  }

  getConfig(): IEngineConfig {
    return this.config;
  }

  dispose(): void {
    this.stop();
    
    // Unload current scene
    if (this.currentScene) {
      this.currentScene.unload();
    }
    
    // Dispose all systems
    this.systems.forEach(system => system.dispose());
    this.systems.clear();
  }

  private gameLoop = (): void => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const rawDelta = (currentTime - this.lastTime) / 1000;
    
    // Apply time scale
    this.deltaTime = rawDelta * this.timeScale;
    this.totalTime += this.deltaTime;
    
    // Update FPS counter
    this.frameCount++;
    this.fpsTimer += rawDelta;
    if (this.fpsTimer >= 1.0) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsTimer = 0;
    }

    // Update loop
    if (!this.isPaused) {
      this.update(this.deltaTime);
    }

    this.lastTime = currentTime;

    // Handle frame rate limiting
    if (this.targetFrameRate > 0) {
      const elapsed = performance.now() - currentTime;
      const delay = Math.max(0, this.targetFrameTime - elapsed);
      setTimeout(() => {
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
      }, delay);
    } else {
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
  };

  private update(deltaTime: number): void {
    // Update all systems in priority order
    const sortedSystems = Array.from(this.systems.values())
      .sort((a, b) => a.priority - b.priority)
      .filter(system => system.enabled);

    sortedSystems.forEach(system => system.update(deltaTime));

    // Update current scene
    if (this.currentScene) {
      this.currentScene.update(deltaTime);
    }

    // Render
    if (this.renderer && this.currentScene) {
      this.renderer.render(this.currentScene);
    }
  }
}

