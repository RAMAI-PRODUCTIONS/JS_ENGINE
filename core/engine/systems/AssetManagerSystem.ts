import { IAssetManager, AssetType, IAsset, AssetProgressCallback } from '../interfaces/IAssetManager';
import * as THREE from 'three';

// GLTFLoader will be dynamically imported at runtime
type GLTFLoader = any;

/**
 * Asset Manager System
 * Handles loading and caching of all game assets
 */
export class AssetManagerSystem implements IAssetManager {
  public readonly name: string = 'AssetManager';
  public readonly priority: number = -10; // Load early
  public enabled: boolean = true;

  private assets: Map<string, IAsset> = new Map();
  private progressCallbacks: AssetProgressCallback[] = [];
  
  private textureLoader: THREE.TextureLoader;
  private gltfLoader: GLTFLoader | null = null;
  private audioLoader: (url: string) => Promise<AudioBuffer>;

  constructor(audioContext?: AudioContext) {
    this.textureLoader = new THREE.TextureLoader();
    // GLTFLoader will be lazy-loaded when needed
    
    this.audioLoader = audioContext
      ? async (url: string) => {
          const response = await fetch(url);
          const arrayBuffer = await response.arrayBuffer();
          return await audioContext.decodeAudioData(arrayBuffer);
        }
      : async () => {
          throw new Error('Audio context not provided');
        };
  }

  async initialize(): Promise<void> {
    console.log('[AssetManagerSystem] Initialized');
  }

  update(_deltaTime: number): void {
    // Asset manager doesn't need per-frame updates
  }

  dispose(): void {
    this.clear();
  }

  async loadAsset(id: string, url: string, type: AssetType): Promise<any> {
    if (this.assets.has(id)) {
      return this.assets.get(id)!.data;
    }

    try {
      let data: any;
      let size = 0;

      switch (type) {
        case 'texture':
          data = await this.loadTexture(url);
          size = this.estimateTextureSize(data);
          break;
        case 'model':
          data = await this.loadModel(url);
          size = this.estimateModelSize(data);
          break;
        case 'audio':
          data = await this.audioLoader(url);
          size = data.length * 4; // Approximate size in bytes
          break;
        case 'json':
          data = await this.loadJSON(url);
          size = JSON.stringify(data).length;
          break;
        case 'shader':
          data = await this.loadText(url);
          size = data.length;
          break;
        case 'binary':
          data = await this.loadBinary(url);
          size = data.byteLength;
          break;
        default:
          throw new Error(`Unknown asset type: ${type}`);
      }

      const asset: IAsset = {
        id,
        type,
        url,
        data,
        size,
        loaded: true
      };

      this.assets.set(id, asset);
      return data;
    } catch (error) {
      console.error(`[AssetManagerSystem] Failed to load asset: ${url}`, error);
      throw error;
    }
  }

  async loadAssets(assets: Array<{ id: string; url: string; type: AssetType }>): Promise<void> {
    const total = assets.length;
    let loaded = 0;

    const promises = assets.map(async (asset) => {
      await this.loadAsset(asset.id, asset.url, asset.type);
      loaded++;
      this.progressCallbacks.forEach(cb => cb(loaded, total));
    });

    await Promise.all(promises);
  }

  unloadAsset(id: string): void {
    const asset = this.assets.get(id);
    if (!asset) return;

    // Dispose Three.js resources
    if (asset.type === 'texture' && asset.data instanceof THREE.Texture) {
      asset.data.dispose();
    } else if (asset.type === 'model') {
      // Dispose model resources
      asset.data.scene?.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat: any) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    }

    this.assets.delete(id);
  }

  getAsset<T = any>(id: string): T | null {
    return (this.assets.get(id)?.data as T) || null;
  }

  isAssetLoaded(id: string): boolean {
    return this.assets.has(id);
  }

  getAllAssets(): IAsset[] {
    return Array.from(this.assets.values());
  }

  getMemoryUsage() {
    let totalSize = 0;
    const byType: Record<AssetType, number> = {
      texture: 0,
      model: 0,
      audio: 0,
      shader: 0,
      font: 0,
      json: 0,
      binary: 0
    };

    this.assets.forEach(asset => {
      totalSize += asset.size;
      byType[asset.type] += asset.size;
    });

    return {
      totalSize,
      assetCount: this.assets.size,
      byType
    };
  }

  onProgress(callback: AssetProgressCallback): void {
    this.progressCallbacks.push(callback);
  }

  async preloadScene(sceneId: string): Promise<void> {
    // Scene-specific asset preloading would be implemented here
    // based on scene manifests or asset lists
    console.log(`[AssetManagerSystem] Preloading scene: ${sceneId}`);
  }

  clear(): void {
    this.assets.forEach((_asset, id) => this.unloadAsset(id));
    this.assets.clear();
  }

  // Private loading methods
  private loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(url, resolve, undefined, reject);
    });
  }

  private async loadModel(url: string): Promise<any> {
    if (!this.gltfLoader) {
      // Lazy load GLTFLoader
      try {
        const GLTFLoaderModule = await import('three/examples/jsm/loaders/GLTFLoader.js');
        this.gltfLoader = new GLTFLoaderModule.GLTFLoader();
      } catch (error) {
        throw new Error('GLTFLoader not available. Install three.js with examples.');
      }
    }
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(url, resolve, undefined, reject);
    });
  }

  private async loadJSON(url: string): Promise<any> {
    const response = await fetch(url);
    return await response.json();
  }

  private async loadText(url: string): Promise<string> {
    const response = await fetch(url);
    return await response.text();
  }

  private async loadBinary(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    return await response.arrayBuffer();
  }

  private estimateTextureSize(texture: THREE.Texture): number {
    if (!texture.image) return 0;
    const width = texture.image.width || 0;
    const height = texture.image.height || 0;
    return width * height * 4; // RGBA
  }

  private estimateModelSize(gltf: any): number {
    let size = 0;
    gltf.scene?.traverse((obj: any) => {
      if (obj.geometry) {
        const geo = obj.geometry;
        const positions = geo.attributes.position;
        size += positions ? positions.count * 12 : 0; // 3 floats per vertex
      }
    });
    return size;
  }
}

