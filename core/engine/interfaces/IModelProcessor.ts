import { ISystem } from './ISystem';

/**
 * Model processing options
 */
export interface IModelProcessOptions {
  /**
   * Enable Draco compression
   */
  draco?: boolean;
  /**
   * Draco decoder path (local or CDN)
   */
  dracoPath?: string;
  /**
   * Enable meshopt compression
   */
  meshopt?: boolean;
  /**
   * Auto-transform model (compression, resize, optimize)
   */
  transform?: boolean;
  /**
   * Enable instancing for similar geometries
   */
  instance?: boolean;
  /**
   * Instance all geometry (maximum optimization)
   */
  instanceAll?: boolean;
  /**
   * Generate TypeScript types
   */
  types?: boolean;
  /**
   * Output directory for processed models
   */
  outputDir?: string;
  /**
   * Texture resize (max dimension)
   */
  textureMaxSize?: number;
  /**
   * Output format ('jsx' | 'tsx' | 'component')
   */
  outputFormat?: 'jsx' | 'tsx' | 'component';
}

/**
 * Processed model result
 */
export interface IProcessedModel {
  /**
   * Original model ID
   */
  originalId: string;
  /**
   * Processed model path
   */
  processedPath: string;
  /**
   * Component code (if outputFormat is component)
   */
  componentCode?: string;
  /**
   * Type definitions (if types enabled)
   */
  typeDefinitions?: string;
  /**
   * Processing metadata
   */
  metadata: {
    originalSize: number;
    processedSize: number;
    compressionRatio: number;
    hasAnimations: boolean;
    meshCount: number;
    materialCount: number;
    textureCount: number;
  };
}

/**
 * Model Processor interface
 * Handles GLTF/GLB model optimization and JSX conversion
 * Based on gltfjsx principles for better performance and reusability
 */
export interface IModelProcessor extends ISystem {
  /**
   * Process a GLTF/GLB model
   * @param modelPath - Path to the model file
   * @param options - Processing options
   * @returns Processed model information
   */
  processModel(modelPath: string, options?: IModelProcessOptions): Promise<IProcessedModel>;

  /**
   * Batch process multiple models
   * @param models - Array of model paths with options
   * @returns Array of processed models
   */
  processModels(
    models: Array<{ path: string; options?: IModelProcessOptions }>
  ): Promise<IProcessedModel[]>;

  /**
   * Generate JSX component from GLTF
   * @param modelPath - Path to the model
   * @param options - Processing options
   * @returns Component code string
   */
  generateComponent(modelPath: string, options?: IModelProcessOptions): Promise<string>;

  /**
   * Check if model needs processing
   * @param modelPath - Path to the model
   * @returns True if model should be processed
   */
  needsProcessing(modelPath: string): boolean;

  /**
   * Get processing status for a model
   * @param modelId - Model identifier
   * @returns Processing status or null if not processing
   */
  getProcessingStatus(modelId: string): {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress?: number;
    error?: string;
  } | null;

  /**
   * Preload processed model component
   * @param modelPath - Path to processed model
   */
  preloadModel(modelPath: string): Promise<void>;
}

