import { useEffect, useRef, useState } from 'react';
import { Engine, RendererSystem, InputSystem, PhysicsSystem, AudioSystem, AssetManagerSystem } from '../core/engine/index';
import { MainScene } from '../project/code/scenes/MainScene';
import './index.css';

/**
 * Main Application Component
 * Initializes and runs the game engine
 */
export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const initEngine = async () => {
      try {
        // Create engine instance
        const engine = new Engine();
        engineRef.current = engine;

        // Create and register systems
        const canvas = canvasRef.current!;
        const renderer = new RendererSystem(canvas);
        const input = new InputSystem(canvas);
        const physics = new PhysicsSystem();
        const audio = new AudioSystem();
        // Asset manager can work without audio context for non-audio assets
        const assets = new AssetManagerSystem();

        engine.registerSystem(assets); // Register first (priority -10)
        engine.registerSystem(input);
        engine.registerSystem(physics);
        engine.registerSystem(audio);
        engine.registerSystem(renderer); // Register last (priority 100)

        // Initialize engine (this will initialize all systems in priority order)
        await engine.initialize({
          canvas,
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: window.devicePixelRatio,
          physics: {
            enabled: true,
            gravity: { x: 0, y: -9.81, z: 0 }
          },
          audio: {
            enabled: true
          },
          debug: true
        });
        
        // Set audio context for asset manager after audio is initialized
        const audioContext = (audio as any).context;
        if (audioContext) {
          (assets as any).audioLoader = async (url: string) => {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            return await audioContext.decodeAudioData(arrayBuffer);
          };
        }

        // Load main scene
        const mainScene = new MainScene();
        await engine.loadScene(mainScene);

        // Start engine
        engine.start();

        // Update FPS display
        const fpsInterval = setInterval(() => {
          setFps(Math.round(engine.fps));
        }, 100);

        setIsLoading(false);

        // Handle window resize
        const handleResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(window.devicePixelRatio);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
          clearInterval(fpsInterval);
          window.removeEventListener('resize', handleResize);
          engine.dispose();
        };
      } catch (error) {
        console.error('[App] Failed to initialize engine:', error);
        setIsLoading(false);
      }
    };

    initEngine();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '24px',
          fontFamily: 'Arial, sans-serif',
          zIndex: 1000
        }}>
          Loading Engine...
        </div>
      )}
      
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000
      }}>
        <div>FPS: {fps}</div>
        <div>JS Game Engine v1.0.0</div>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          touchAction: 'none'
        }}
      />
    </div>
  );
}

