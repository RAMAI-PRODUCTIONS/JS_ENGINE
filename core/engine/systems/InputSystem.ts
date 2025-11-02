import { IInput } from '../interfaces/IInput';

/**
 * Input System
 * Handles keyboard, mouse, touch, and gamepad input
 */
export class InputSystem implements IInput {
  public readonly name: string = 'Input';
  public readonly priority: number = 0;
  public enabled: boolean = true;

  private keysDown: Set<string> = new Set();
  private keysPressed: Set<string> = new Set();
  private keysReleased: Set<string> = new Set();
  
  private mousePosition = { x: 0, y: 0 };
  private mousePositionLast = { x: 0, y: 0 };
  private mouseDelta = { x: 0, y: 0 };
  private mouseButtons: Set<number> = new Set();
  private mouseButtonsPressed: Set<number> = new Set();
  private mouseWheelDelta: number = 0;
  
  private touches: Array<{ id: number; x: number; y: number }> = [];
  private pointerLocked: boolean = false;
  
  private actionMappings: Map<string, string[]> = new Map();
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  async initialize(): Promise<void> {
    // Keyboard events
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    
    // Mouse events
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('wheel', this.handleWheel);
    
    // Touch events
    this.canvas.addEventListener('touchstart', this.handleTouchStart);
    this.canvas.addEventListener('touchmove', this.handleTouchMove);
    this.canvas.addEventListener('touchend', this.handleTouchEnd);
    
    // Pointer lock events
    document.addEventListener('pointerlockchange', this.handlePointerLockChange);
    
    console.log('[InputSystem] Initialized');
  }

  update(_deltaTime: number): void {
    // Clear frame-specific input states
    this.keysPressed.clear();
    this.keysReleased.clear();
    this.mouseButtonsPressed.clear();
    
    // Update mouse delta
    this.mouseDelta.x = this.mousePosition.x - this.mousePositionLast.x;
    this.mouseDelta.y = this.mousePosition.y - this.mousePositionLast.y;
    this.mousePositionLast.x = this.mousePosition.x;
    this.mousePositionLast.y = this.mousePosition.y;
    
    // Reset wheel delta
    this.mouseWheelDelta = 0;
  }

  dispose(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.removeEventListener('mouseup', this.handleMouseUp);
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('touchstart', this.handleTouchStart);
    this.canvas.removeEventListener('touchmove', this.handleTouchMove);
    this.canvas.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
  }

  isKeyDown(key: string): boolean {
    return this.keysDown.has(key.toLowerCase());
  }

  isKeyPressed(key: string): boolean {
    return this.keysPressed.has(key.toLowerCase());
  }

  isKeyReleased(key: string): boolean {
    return this.keysReleased.has(key.toLowerCase());
  }

  getMousePosition() {
    return { ...this.mousePosition };
  }

  getMouseDelta() {
    return { ...this.mouseDelta };
  }

  isMouseButtonDown(button: number): boolean {
    return this.mouseButtons.has(button);
  }

  isMouseButtonPressed(button: number): boolean {
    return this.mouseButtonsPressed.has(button);
  }

  getMouseWheelDelta(): number {
    return this.mouseWheelDelta;
  }

  getTouches() {
    return [...this.touches];
  }

  isGamepadConnected(index: number): boolean {
    const gamepads = navigator.getGamepads();
    return gamepads[index] !== null;
  }

  isGamepadButtonDown(gamepadIndex: number, button: number): boolean {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[gamepadIndex];
    return gamepad?.buttons[button]?.pressed || false;
  }

  getGamepadAxis(gamepadIndex: number, axis: number): number {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[gamepadIndex];
    return gamepad?.axes[axis] || 0;
  }

  lockPointer(): void {
    this.canvas.requestPointerLock();
  }

  unlockPointer(): void {
    document.exitPointerLock();
  }

  isPointerLocked(): boolean {
    return this.pointerLocked;
  }

  mapAction(actionName: string, keys: string[]): void {
    this.actionMappings.set(actionName, keys.map(k => k.toLowerCase()));
  }

  isActionDown(actionName: string): boolean {
    const keys = this.actionMappings.get(actionName);
    return keys?.some(key => this.isKeyDown(key)) || false;
  }

  isActionPressed(actionName: string): boolean {
    const keys = this.actionMappings.get(actionName);
    return keys?.some(key => this.isKeyPressed(key)) || false;
  }

  isActionReleased(actionName: string): boolean {
    const keys = this.actionMappings.get(actionName);
    return keys?.some(key => this.isKeyReleased(key)) || false;
  }

  // Event handlers
  private handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (!this.keysDown.has(key)) {
      this.keysPressed.add(key);
    }
    this.keysDown.add(key);
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    this.keysDown.delete(key);
    this.keysReleased.add(key);
  };

  private handleMouseMove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePosition.x = e.clientX - rect.left;
    this.mousePosition.y = e.clientY - rect.top;
  };

  private handleMouseDown = (e: MouseEvent) => {
    this.mouseButtons.add(e.button);
    this.mouseButtonsPressed.add(e.button);
  };

  private handleMouseUp = (e: MouseEvent) => {
    this.mouseButtons.delete(e.button);
  };

  private handleWheel = (e: WheelEvent) => {
    this.mouseWheelDelta = e.deltaY;
  };

  private handleTouchStart = (e: TouchEvent) => {
    this.updateTouches(e.touches);
  };

  private handleTouchMove = (e: TouchEvent) => {
    this.updateTouches(e.touches);
  };

  private handleTouchEnd = (e: TouchEvent) => {
    this.updateTouches(e.touches);
  };

  private updateTouches(touches: TouchList) {
    this.touches = [];
    const rect = this.canvas.getBoundingClientRect();
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      this.touches.push({
        id: touch.identifier,
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      });
    }
  }

  private handlePointerLockChange = () => {
    this.pointerLocked = document.pointerLockElement === this.canvas;
  };
}

