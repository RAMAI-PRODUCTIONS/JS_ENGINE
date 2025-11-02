import { IAudio, IAudioSource } from '../interfaces/IAudio';

/**
 * Audio System
 * Handles 2D and 3D audio using Web Audio API
 */
export class AudioSystem implements IAudio {
  public readonly name: string = 'Audio';
  public readonly priority: number = 50;
  public enabled: boolean = true;

  public masterVolume: number = 1.0;
  public musicVolume: number = 1.0;
  public sfxVolume: number = 1.0;

  private context: AudioContext;
  private listener: AudioListener;
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private sources: Map<string, IAudioSource> = new Map();
  private nextSourceId: number = 0;

  constructor() {
    this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.listener = this.context.listener;
  }

  async initialize(): Promise<void> {
    // Resume audio context (required for some browsers)
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    console.log('[AudioSystem] Initialized');
  }

  update(_deltaTime: number): void {
    // Clean up finished sources
    const toRemove: string[] = [];
    this.sources.forEach((source, id) => {
      if (!source.isPlaying && !source.loop) {
        toRemove.push(id);
      }
    });
    toRemove.forEach(id => this.sources.delete(id));
  }

  dispose(): void {
    this.stopAllSounds();
    this.audioBuffers.clear();
    this.context.close();
  }

  async loadAudio(id: string, url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(id, audioBuffer);
    } catch (error) {
      console.error(`[AudioSystem] Failed to load audio: ${url}`, error);
    }
  }

  unloadAudio(id: string): void {
    this.audioBuffers.delete(id);
  }

  playSound(audioId: string, volume: number = 1.0, loop: boolean = false): IAudioSource {
    const buffer = this.audioBuffers.get(audioId);
    if (!buffer) {
      console.warn(`[AudioSystem] Audio not loaded: ${audioId}`);
      return this.createDummySource();
    }

    const sourceNode = this.context.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = loop;

    const gainNode = this.context.createGain();
    gainNode.gain.value = volume * this.sfxVolume * this.masterVolume;

    sourceNode.connect(gainNode);
    gainNode.connect(this.context.destination);

    const id = `source_${this.nextSourceId++}`;
    let isPlaying = false;

    const audioSource: IAudioSource = {
      id,
      volume,
      pitch: 1.0,
      loop,
      isPlaying: false,
      currentTime: 0,
      duration: buffer.duration,
      play: () => {
        if (!isPlaying) {
          sourceNode.start();
          isPlaying = true;
          (audioSource as any).isPlaying = true;
        }
      },
      pause: () => {
        // Web Audio API doesn't support pause, would need to track time
      },
      stop: () => {
        if (isPlaying) {
          sourceNode.stop();
          isPlaying = false;
          (audioSource as any).isPlaying = false;
        }
      },
      setPosition: () => {
        // 2D sounds don't have position
      },
      set3DProperties: () => {
        // 2D sounds don't have 3D properties
      }
    };

    sourceNode.onended = () => {
      (audioSource as any).isPlaying = false;
      this.sources.delete(id);
    };

    this.sources.set(id, audioSource);
    audioSource.play();

    return audioSource;
  }

  playSound3D(
    audioId: string,
    x: number,
    y: number,
    z: number,
    volume: number = 1.0,
    loop: boolean = false
  ): IAudioSource {
    const buffer = this.audioBuffers.get(audioId);
    if (!buffer) {
      console.warn(`[AudioSystem] Audio not loaded: ${audioId}`);
      return this.createDummySource();
    }

    const sourceNode = this.context.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = loop;

    const panner = this.context.createPanner();
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10000;
    panner.rolloffFactor = 1;
    panner.positionX.value = x;
    panner.positionY.value = y;
    panner.positionZ.value = z;

    const gainNode = this.context.createGain();
    gainNode.gain.value = volume * this.sfxVolume * this.masterVolume;

    sourceNode.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(this.context.destination);

    const id = `source_${this.nextSourceId++}`;
    let isPlaying = false;

    const audioSource: IAudioSource = {
      id,
      volume,
      pitch: 1.0,
      loop,
      isPlaying: false,
      currentTime: 0,
      duration: buffer.duration,
      play: () => {
        if (!isPlaying) {
          sourceNode.start();
          isPlaying = true;
          (audioSource as any).isPlaying = true;
        }
      },
      pause: () => {},
      stop: () => {
        if (isPlaying) {
          sourceNode.stop();
          isPlaying = false;
          (audioSource as any).isPlaying = false;
        }
      },
      setPosition: (nx: number, ny: number, nz: number) => {
        panner.positionX.value = nx;
        panner.positionY.value = ny;
        panner.positionZ.value = nz;
      },
      set3DProperties: (minDistance: number, maxDistance: number) => {
        panner.refDistance = minDistance;
        panner.maxDistance = maxDistance;
      }
    };

    sourceNode.onended = () => {
      (audioSource as any).isPlaying = false;
      this.sources.delete(id);
    };

    this.sources.set(id, audioSource);
    audioSource.play();

    return audioSource;
  }

  playMusic(audioId: string, volume: number = 1.0, _fadeInDuration: number = 0): IAudioSource {
    return this.playSound(audioId, volume * this.musicVolume, true);
  }

  stopAllSounds(): void {
    this.sources.forEach(source => source.stop());
    this.sources.clear();
  }

  setListenerPosition(x: number, y: number, z: number): void {
    if (this.listener.positionX) {
      this.listener.positionX.value = x;
      this.listener.positionY.value = y;
      this.listener.positionZ.value = z;
    }
  }

  setListenerOrientation(
    forwardX: number,
    forwardY: number,
    forwardZ: number,
    upX: number,
    upY: number,
    upZ: number
  ): void {
    if (this.listener.forwardX) {
      this.listener.forwardX.value = forwardX;
      this.listener.forwardY.value = forwardY;
      this.listener.forwardZ.value = forwardZ;
      this.listener.upX.value = upX;
      this.listener.upY.value = upY;
      this.listener.upZ.value = upZ;
    }
  }

  getSource(id: string): IAudioSource | null {
    return this.sources.get(id) || null;
  }

  private createDummySource(): IAudioSource {
    return {
      id: 'dummy',
      volume: 0,
      pitch: 1,
      loop: false,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      play: () => {},
      pause: () => {},
      stop: () => {},
      setPosition: () => {},
      set3DProperties: () => {}
    };
  }
}

