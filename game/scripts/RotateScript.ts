import { Script, Transform } from '@engine/index';

/**
 * Example Script: Rotates an entity
 * Demonstrates how to create custom game logic
 */
export class RotateScript extends Script {
  private transform: Transform | null = null;
  private rotationSpeed = { x: 0, y: 1, z: 0 }; // Radians per second

  protected onAwake(): void {
    console.log('[RotateScript] Awake');
  }

  protected onStart(): void {
    // Get the Transform component from this entity
    this.transform = this.getComponent<Transform>('Transform');
    
    if (!this.transform) {
      console.warn('[RotateScript] No Transform component found!');
    }
  }

  protected update(deltaTime: number): void {
    if (!this.transform) return;

    // Rotate the entity
    this.transform.rotation.x += this.rotationSpeed.x * deltaTime;
    this.transform.rotation.y += this.rotationSpeed.y * deltaTime;
    this.transform.rotation.z += this.rotationSpeed.z * deltaTime;
  }

  /**
   * Set rotation speed (public API for this script)
   */
  public setRotationSpeed(x: number, y: number, z: number): void {
    this.rotationSpeed = { x, y, z };
  }

  protected onDestroy(): void {
    console.log('[RotateScript] Destroyed');
  }
}

