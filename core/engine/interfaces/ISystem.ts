/**
 * Base interface for all engine systems
 * Systems are modular components that handle specific aspects of the engine
 */
export interface ISystem {
  /**
   * Initialize the system
   * Called once when the system is first created
   */
  initialize(): Promise<void>;

  /**
   * Update the system
   * Called every frame
   * @param deltaTime - Time elapsed since last frame in seconds
   */
  update(deltaTime: number): void;

  /**
   * Clean up resources
   * Called when the system is being destroyed
   */
  dispose(): void;

  /**
   * Get the system name for identification
   */
  readonly name: string;

  /**
   * System priority for update order (lower = earlier)
   */
  readonly priority: number;

  /**
   * Whether the system is currently enabled
   */
  enabled: boolean;
}

