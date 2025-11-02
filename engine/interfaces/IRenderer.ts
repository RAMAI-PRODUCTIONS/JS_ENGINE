import { ISystem } from './ISystem';
import { IScene } from './IScene';

/**
 * Rendering system interface
 * Handles all 3D rendering operations
 */
export interface IRenderer extends ISystem {
  /**
   * The canvas element being rendered to
   */
  readonly canvas: HTMLCanvasElement;

  /**
   * Current render width
   */
  readonly width: number;

  /**
   * Current render height
   */
  readonly height: number;

  /**
   * Set the render size
   */
  setSize(width: number, height: number): void;

  /**
   * Set the pixel ratio (for high DPI displays)
   */
  setPixelRatio(ratio: number): void;

  /**
   * Render a scene
   */
  render(scene: IScene): void;

  /**
   * Get rendering statistics
   */
  getStats(): {
    fps: number;
    drawCalls: number;
    triangles: number;
    textures: number;
    geometries: number;
  };

  /**
   * Enable/disable shadows
   */
  shadowsEnabled: boolean;

  /**
   * Set shadow quality
   */
  shadowQuality: 'low' | 'medium' | 'high';

  /**
   * Enable/disable post-processing
   */
  postProcessingEnabled: boolean;

  /**
   * Get the underlying rendering context/engine
   */
  getContext(): any;
}

