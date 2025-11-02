import { IComponent } from '../interfaces/IComponent';
import { generateId } from '../utils/IdGenerator';

export type LightType = 'directional' | 'point' | 'spot' | 'ambient';

/**
 * Light Component
 * Adds lighting to the scene
 */
export class Light implements IComponent {
  public readonly id: string;
  public readonly type: string = 'Light';
  public entityId: string = '';
  public enabled: boolean = true;

  public lightType: LightType = 'point';
  public color: { r: number; g: number; b: number } = { r: 1, g: 1, b: 1 };
  public intensity: number = 1.0;
  public castShadows: boolean = false;

  // Point/Spot light
  public distance: number = 0;
  public decay: number = 1;

  // Spot light
  public angle: number = Math.PI / 3;
  public penumbra: number = 0;

  constructor(lightType: LightType = 'point') {
    this.id = generateId();
    this.lightType = lightType;
  }

  onAttach(): void {
    // Light attached
  }

  onDetach(): void {
    // Light detached
  }

  serialize(): Record<string, any> {
    return {
      type: this.type,
      lightType: this.lightType,
      color: { ...this.color },
      intensity: this.intensity,
      castShadows: this.castShadows,
      distance: this.distance,
      decay: this.decay,
      angle: this.angle,
      penumbra: this.penumbra
    };
  }

  deserialize(data: Record<string, any>): void {
    this.lightType = data.lightType || 'point';
    if (data.color) this.color = { ...data.color };
    this.intensity = data.intensity ?? 1.0;
    this.castShadows = data.castShadows ?? false;
    this.distance = data.distance ?? 0;
    this.decay = data.decay ?? 1;
    this.angle = data.angle ?? Math.PI / 3;
    this.penumbra = data.penumbra ?? 0;
  }
}

