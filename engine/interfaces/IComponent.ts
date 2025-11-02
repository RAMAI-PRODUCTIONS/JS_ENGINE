/**
 * Base interface for Entity Component System (ECS) components
 */
export interface IComponent {
  /**
   * Unique identifier for this component instance
   */
  readonly id: string;

  /**
   * The type/name of this component
   */
  readonly type: string;

  /**
   * The entity this component is attached to
   */
  entityId: string;

  /**
   * Whether this component is currently active
   */
  enabled: boolean;

  /**
   * Called when component is attached to an entity
   */
  onAttach?(): void;

  /**
   * Called when component is detached from an entity
   */
  onDetach?(): void;

  /**
   * Called every frame if component is enabled
   */
  onUpdate?(deltaTime: number): void;

  /**
   * Serialize component data
   */
  serialize(): Record<string, any>;

  /**
   * Deserialize component data
   */
  deserialize(data: Record<string, any>): void;
}

