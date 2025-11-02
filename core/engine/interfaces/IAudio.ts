import { ISystem } from './ISystem';

/**
 * Audio source interface
 */
export interface IAudioSource {
  id: string;
  entityId?: string;
  
  play(): void;
  pause(): void;
  stop(): void;
  
  volume: number;
  pitch: number;
  loop: boolean;
  
  readonly isPlaying: boolean;
  readonly currentTime: number;
  readonly duration: number;
  
  setPosition(x: number, y: number, z: number): void;
  set3DProperties(minDistance: number, maxDistance: number): void;
}

/**
 * Audio system interface
 * Handles 2D and 3D audio playback
 */
export interface IAudio extends ISystem {
  /**
   * Master volume (0 to 1)
   */
  masterVolume: number;

  /**
   * Music volume (0 to 1)
   */
  musicVolume: number;

  /**
   * Sound effects volume (0 to 1)
   */
  sfxVolume: number;

  /**
   * Load an audio file
   */
  loadAudio(id: string, url: string): Promise<void>;

  /**
   * Unload an audio file
   */
  unloadAudio(id: string): void;

  /**
   * Play a 2D sound
   */
  playSound(audioId: string, volume?: number, loop?: boolean): IAudioSource;

  /**
   * Play a 3D sound at a position
   */
  playSound3D(
    audioId: string,
    x: number,
    y: number,
    z: number,
    volume?: number,
    loop?: boolean
  ): IAudioSource;

  /**
   * Play background music
   */
  playMusic(audioId: string, volume?: number, fadeInDuration?: number): IAudioSource;

  /**
   * Stop all sounds
   */
  stopAllSounds(): void;

  /**
   * Set the audio listener position (usually the camera)
   */
  setListenerPosition(x: number, y: number, z: number): void;

  /**
   * Set the audio listener orientation
   */
  setListenerOrientation(
    forwardX: number,
    forwardY: number,
    forwardZ: number,
    upX: number,
    upY: number,
    upZ: number
  ): void;

  /**
   * Get an audio source by ID
   */
  getSource(id: string): IAudioSource | null;
}

