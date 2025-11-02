import { IComponent } from '../interfaces/IComponent';
import { IEntity } from '../interfaces/IEntity';
import { generateId } from '../utils/IdGenerator';

/**
 * Base Script Component
 * Extend this class to create custom game logic scripts
 */
export abstract class Script implements IComponent {
  public readonly id: string;
  public readonly type: string = 'Script';
  public entityId: string = '';
  public enabled: boolean = true;

  protected entity: IEntity | null = null;

  constructor() {
    this.id = generateId();
  }

  onAttach(): void {
    this.onAwake?.();
    this.onStart?.();
  }

  onDetach(): void {
    this.onDestroy?.();
  }

  onUpdate(deltaTime: number): void {
    this.update?.(deltaTime);
  }

  serialize(): Record<string, any> {
    return {
      type: this.type,
      scriptName: this.constructor.name
    };
  }

  deserialize(_data: Record<string, any>): void {
    // Script deserialization would need a script registry
  }

  // Lifecycle methods for users to override
  protected onAwake?(): void;
  protected onStart?(): void;
  protected update?(deltaTime: number): void;
  protected onDestroy?(): void;

  // Helper to get the entity this script is attached to
  protected getEntity(): IEntity | null {
    return this.entity;
  }

  // Helper to get another component on the same entity
  protected getComponent<T extends IComponent>(type: string): T | null {
    return this.entity?.getComponent<T>(type) || null;
  }
}

