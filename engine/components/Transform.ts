import { IComponent } from '../interfaces/IComponent';
import { generateId } from '../utils/IdGenerator';

/**
 * Transform Component
 * Handles position, rotation, and scale of entities
 */
export class Transform implements IComponent {
  public readonly id: string;
  public readonly type: string = 'Transform';
  public entityId: string = '';
  public enabled: boolean = true;

  public position: { x: number; y: number; z: number };
  public rotation: { x: number; y: number; z: number };
  public scale: { x: number; y: number; z: number };

  constructor(
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    scale = { x: 1, y: 1, z: 1 }
  ) {
    this.id = generateId();
    this.position = { ...position };
    this.rotation = { ...rotation };
    this.scale = { ...scale };
  }

  onAttach(): void {
    // Component attached to entity
  }

  onDetach(): void {
    // Component detached from entity
  }

  onUpdate(_deltaTime: number): void {
    // Transform updates if needed
  }

  serialize(): Record<string, any> {
    return {
      type: this.type,
      position: { ...this.position },
      rotation: { ...this.rotation },
      scale: { ...this.scale }
    };
  }

  deserialize(data: Record<string, any>): void {
    if (data.position) this.position = { ...data.position };
    if (data.rotation) this.rotation = { ...data.rotation };
    if (data.scale) this.scale = { ...data.scale };
  }

  // Helper methods
  translate(x: number, y: number, z: number): void {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }

  rotate(x: number, y: number, z: number): void {
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
  }

  lookAt(target: { x: number; y: number; z: number }): void {
    // Calculate rotation to look at target
    const dx = target.x - this.position.x;
    const dy = target.y - this.position.y;
    const dz = target.z - this.position.z;
    
    this.rotation.y = Math.atan2(dx, dz);
    this.rotation.x = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
  }
}

