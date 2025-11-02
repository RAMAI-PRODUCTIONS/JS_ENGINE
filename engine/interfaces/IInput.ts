import { ISystem } from './ISystem';

/**
 * Input system interface
 * Handles keyboard, mouse, touch, and gamepad input
 */
export interface IInput extends ISystem {
  /**
   * Check if a key is currently pressed
   */
  isKeyDown(key: string): boolean;

  /**
   * Check if a key was pressed this frame
   */
  isKeyPressed(key: string): boolean;

  /**
   * Check if a key was released this frame
   */
  isKeyReleased(key: string): boolean;

  /**
   * Get mouse position in screen space
   */
  getMousePosition(): { x: number; y: number };

  /**
   * Get mouse delta (movement since last frame)
   */
  getMouseDelta(): { x: number; y: number };

  /**
   * Check if a mouse button is pressed
   */
  isMouseButtonDown(button: number): boolean;

  /**
   * Check if a mouse button was pressed this frame
   */
  isMouseButtonPressed(button: number): boolean;

  /**
   * Get mouse wheel delta
   */
  getMouseWheelDelta(): number;

  /**
   * Get all active touches (for mobile)
   */
  getTouches(): Array<{ id: number; x: number; y: number }>;

  /**
   * Check if a gamepad is connected
   */
  isGamepadConnected(index: number): boolean;

  /**
   * Get gamepad button state
   */
  isGamepadButtonDown(gamepadIndex: number, button: number): boolean;

  /**
   * Get gamepad axis value (-1 to 1)
   */
  getGamepadAxis(gamepadIndex: number, axis: number): number;

  /**
   * Lock/unlock the mouse pointer
   */
  lockPointer(): void;
  unlockPointer(): void;
  isPointerLocked(): boolean;

  /**
   * Register input action mappings
   */
  mapAction(actionName: string, keys: string[]): void;

  /**
   * Check if a mapped action is active
   */
  isActionDown(actionName: string): boolean;
  isActionPressed(actionName: string): boolean;
  isActionReleased(actionName: string): boolean;
}

