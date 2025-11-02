import { IComponent } from '../interfaces/IComponent';
import { generateId } from '../utils/IdGenerator';

/**
 * Mesh Renderer Component
 * Renders 3D meshes
 */
export class MeshRenderer implements IComponent {
  public readonly id: string;
  public readonly type: string = 'MeshRenderer';
  public entityId: string = '';
  public enabled: boolean = true;

  public meshId: string = '';
  public materialId: string = '';
  public castShadows: boolean = true;
  public receiveShadows: boolean = true;

  constructor(meshId: string = '', materialId: string = '') {
    this.id = generateId();
    this.meshId = meshId;
    this.materialId = materialId;
  }

  onAttach(): void {
    // Setup renderer
  }

  onDetach(): void {
    // Cleanup renderer
  }

  serialize(): Record<string, any> {
    return {
      type: this.type,
      meshId: this.meshId,
      materialId: this.materialId,
      castShadows: this.castShadows,
      receiveShadows: this.receiveShadows
    };
  }

  deserialize(data: Record<string, any>): void {
    this.meshId = data.meshId || '';
    this.materialId = data.materialId || '';
    this.castShadows = data.castShadows ?? true;
    this.receiveShadows = data.receiveShadows ?? true;
  }
}

