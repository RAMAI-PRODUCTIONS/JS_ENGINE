import { IComponent } from '../interfaces/IComponent';
import { generateId } from '../utils/IdGenerator';

/**
 * Camera Component
 * Defines a camera for rendering
 */
export class Camera implements IComponent {
  public readonly id: string;
  public readonly type: string = 'Camera';
  public entityId: string = '';
  public enabled: boolean = true;

  public fov: number = 75;
  public near: number = 0.1;
  public far: number = 1000;
  public isMain: boolean = false;

  constructor(fov: number = 75, near: number = 0.1, far: number = 1000) {
    this.id = generateId();
    this.fov = fov;
    this.near = near;
    this.far = far;
  }

  onAttach(): void {
    // Camera attached
  }

  onDetach(): void {
    // Camera detached
  }

  serialize(): Record<string, any> {
    return {
      type: this.type,
      fov: this.fov,
      near: this.near,
      far: this.far,
      isMain: this.isMain
    };
  }

  deserialize(data: Record<string, any>): void {
    this.fov = data.fov || 75;
    this.near = data.near || 0.1;
    this.far = data.far || 1000;
    this.isMain = data.isMain || false;
  }
}

