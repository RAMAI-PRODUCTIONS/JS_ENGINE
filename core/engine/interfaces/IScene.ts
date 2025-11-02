import { IEntity } from './IEntity';

/**
 * Scene interface
 * Manages entities and scene-specific data
 */
export interface IScene {
  /**
   * Unique identifier for this scene
   */
  readonly id: string;

  /**
   * Scene name
   */
  name: string;

  /**
   * Root entities in the scene
   */
  readonly entities: IEntity[];

  /**
   * Whether the scene is currently loaded
   */
  readonly isLoaded: boolean;

  /**
   * Load the scene and its assets
   */
  load(): Promise<void>;

  /**
   * Unload the scene and release resources
   */
  unload(): Promise<void>;

  /**
   * Called when scene becomes active
   */
  onActivate(): void;

  /**
   * Called when scene becomes inactive
   */
  onDeactivate(): void;

  /**
   * Update all entities in the scene
   */
  update(deltaTime: number): void;

  /**
   * Add an entity to the scene
   */
  addEntity(entity: IEntity): void;

  /**
   * Remove an entity from the scene
   */
  removeEntity(entity: IEntity): boolean;

  /**
   * Find an entity by ID
   */
  findEntity(id: string): IEntity | null;

  /**
   * Find an entity by name
   */
  findEntityByName(name: string): IEntity | null;

  /**
   * Find all entities with a specific tag
   */
  findEntitiesByTag(tag: string): IEntity[];

  /**
   * Get all entities with a specific component type
   */
  findEntitiesWithComponent(componentType: string): IEntity[];

  /**
   * Serialize scene to JSON
   */
  serialize(): Record<string, any>;

  /**
   * Deserialize scene from JSON
   */
  deserialize(data: Record<string, any>): Promise<void>;
}

