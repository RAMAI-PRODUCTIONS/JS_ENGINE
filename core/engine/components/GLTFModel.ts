import { IComponent } from '../interfaces/IComponent';
import { generateId } from '../utils/IdGenerator';

/**
 * GLTF Model Component
 * Uses gltfjsx-processed models for optimal performance
 * 
 * Benefits over standard GLTF loading:
 * - Reusable components (can mount multiple times)
 * - Direct node/material access (no traversal)
 * - Better performance (instanced rendering)
 * - Type-safe (if types enabled)
 */
export class GLTFModel implements IComponent {
  public readonly id: string;
  public readonly type: string = 'GLTFModel';
  public entityId: string = '';
  public enabled: boolean = true;

  /**
   * Path to the processed GLTF/GLB model
   */
  public modelPath: string = '';

  /**
   * Whether to auto-dispose on component removal
   */
  public autoDispose: boolean = true;

  /**
   * Animation configuration
   */
  public animations?: {
    playOnStart?: string;
    loop?: boolean;
  };

  private loadedModel: any = null;

  constructor(modelPath: string = '') {
    this.id = generateId();
    this.modelPath = modelPath;
  }

  onAttach(): void {
    // Component attached - model will be loaded by renderer system
  }

  onDetach(): void {
    if (this.autoDispose && this.loadedModel) {
      // Dispose model resources
      this.disposeModel(this.loadedModel);
      this.loadedModel = null;
    }
  }

  onUpdate(_deltaTime: number): void {
    // Model updates (animations, etc.) handled by renderer
  }

  serialize(): Record<string, any> {
    return {
      type: this.type,
      modelPath: this.modelPath,
      autoDispose: this.autoDispose,
      animations: this.animations
    };
  }

  deserialize(data: Record<string, any>): void {
    this.modelPath = data.modelPath || '';
    this.autoDispose = data.autoDispose ?? true;
    this.animations = data.animations;
  }

  /**
   * Set the model to load
   */
  setModel(path: string): void {
    this.modelPath = path;
  }

  /**
   * Dispose model resources
   */
  private disposeModel(model: any): void {
    if (!model) return;

    const traverse = (object: any) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat: any) => mat.dispose());
        } else {
          object.material.dispose();
        }
      }
      if (object.children) {
        object.children.forEach(traverse);
      }
    };

    if (model.scene) {
      traverse(model.scene);
    } else {
      traverse(model);
    }
  }
}

