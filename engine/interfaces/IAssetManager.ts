import { ISystem } from './ISystem';

/**
 * Asset loading progress callback
 */
export type AssetProgressCallback = (loaded: number, total: number) => void;

/**
 * Asset types supported by the engine
 */
export type AssetType = 
  | 'texture'
  | 'model'
  | 'audio'
  | 'shader'
  | 'font'
  | 'json'
  | 'binary';

/**
 * Asset metadata
 */
export interface IAsset {
  id: string;
  type: AssetType;
  url: string;
  data: any;
  size: number;
  loaded: boolean;
}

/**
 * Asset Manager interface
 * Handles loading, caching, and unloading of all game assets
 */
export interface IAssetManager extends ISystem {
  /**
   * Load a single asset
   */
  loadAsset(id: string, url: string, type: AssetType): Promise<any>;

  /**
   * Load multiple assets
   */
  loadAssets(assets: Array<{ id: string; url: string; type: AssetType }>): Promise<void>;

  /**
   * Unload an asset and free memory
   */
  unloadAsset(id: string): void;

  /**
   * Get a loaded asset
   */
  getAsset<T = any>(id: string): T | null;

  /**
   * Check if an asset is loaded
   */
  isAssetLoaded(id: string): boolean;

  /**
   * Get all loaded assets
   */
  getAllAssets(): IAsset[];

  /**
   * Get memory usage statistics
   */
  getMemoryUsage(): {
    totalSize: number;
    assetCount: number;
    byType: Record<AssetType, number>;
  };

  /**
   * Register progress callback for asset loading
   */
  onProgress(callback: AssetProgressCallback): void;

  /**
   * Preload assets for a specific scene
   */
  preloadScene(sceneId: string): Promise<void>;

  /**
   * Clear all loaded assets
   */
  clear(): void;
}

