import { IComponent } from './IComponent';

/**
 * Entity interface for the Entity Component System
 * Entities are containers for components
 */
export interface IEntity {
  /**
   * Unique identifier for this entity
   */
  readonly id: string;

  /**
   * Human-readable name for this entity
   */
  name: string;

  /**
   * Parent entity (null if root)
   */
  parent: IEntity | null;

  /**
   * Child entities
   */
  readonly children: IEntity[];

  /**
   * Whether this entity is active in the scene
   */
  active: boolean;

  /**
   * Tags for categorization and filtering
   */
  tags: Set<string>;

  /**
   * Add a component to this entity
   */
  addComponent(component: IComponent): void;

  /**
   * Get a component by type
   */
  getComponent<T extends IComponent>(type: string): T | null;

  /**
   * Get all components of a specific type
   */
  getComponents<T extends IComponent>(type: string): T[];

  /**
   * Get all components on this entity
   */
  getAllComponents(): IComponent[];

  /**
   * Remove a component from this entity
   */
  removeComponent(component: IComponent): boolean;

  /**
   * Check if entity has a component of specific type
   */
  hasComponent(type: string): boolean;

  /**
   * Add a child entity
   */
  addChild(entity: IEntity): void;

  /**
   * Remove a child entity
   */
  removeChild(entity: IEntity): boolean;

  /**
   * Find a child entity by name
   */
  findChild(name: string): IEntity | null;

  /**
   * Called every frame
   */
  update(deltaTime: number): void;

  /**
   * Destroy this entity and all its children
   */
  destroy(): void;
}

