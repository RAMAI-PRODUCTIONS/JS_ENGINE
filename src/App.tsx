import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './index.css';

/**
 * Green Sphere Component using sm_sphere.glb
 * Loads GLTF model and applies green unlit material
 */
function GreenSphere() {
  // Use base URL for GitHub Pages compatibility
  // BASE_URL will be '/JS_ENGINE/' in production, './' in dev
  const baseUrl = import.meta.env.BASE_URL || './';
  // Ensure proper path construction (handle trailing slashes)
  let assetPath: string;
  if (baseUrl === './') {
    // Development: relative path
    assetPath = './project/assets/meshes/sm_sphere.glb';
  } else {
    // Production: base URL + path (baseUrl already includes leading slash)
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    assetPath = `${cleanBase}/project/assets/meshes/sm_sphere.glb`;
  }
  // Debug: log asset path in development
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Loading GLB from:', assetPath);
      console.log('BASE_URL:', import.meta.env.BASE_URL);
    }
  }, [assetPath]);

  const { scene } = useGLTF(assetPath);
  const meshRef = useRef<THREE.Group>(null);
  
  // Clone scene and apply green unlit material to all meshes (memoized)
  const clonedScene = useMemo(() => {
    if (!scene) return null;
    const cloned = scene.clone();
    cloned.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: '#00ff00' // Green color
        });
      }
    });
    return cloned;
  }, [scene]);
  
  // Slow rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.5 * delta;
    }
  });

  if (!clonedScene) return null;

  return (
    <primitive 
      ref={meshRef} 
      object={clonedScene} 
      position={[0, 0, 0]} 
    />
  );
}

/**
 * Camera setup - positioned to look at sphere
 */
function SceneSetup() {
  return (
    <>
      {/* Camera is automatically set up by Canvas, we'll configure it via gl */}
      <GreenSphere />
    </>
  );
}

/**
 * Main Application Component
 * Uses React Three Fiber with WebGPU/WebGL support
 */
export default function App() {
  const [fps, setFps] = useState(0);
  const [rendererInfo, setRendererInfo] = useState<string>('Loading...');
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    // Update FPS counter
    const updateFPS = () => {
      frameCountRef.current++;
      const now = Date.now();
      if (now - lastTimeRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      requestAnimationFrame(updateFPS);
    };
    const fpsInterval = requestAnimationFrame(updateFPS);
    
    return () => {
      cancelAnimationFrame(fpsInterval);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}>
      {/* FPS and Info Display */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        minWidth: '200px'
      }}>
        <div>FPS: {fps}</div>
        <div>JS Game Engine v1.0.0</div>
        <div style={{ fontSize: '12px', color: '#0f0', marginTop: '5px' }}>
          Using: sm_sphere.glb
        </div>
        <div style={{ fontSize: '12px', color: '#aaa', marginTop: '5px' }}>
          Renderer: {rendererInfo}
        </div>
      </div>

      {/* React Three Fiber Canvas */}
      <Canvas
        gl={(canvas) => {
          // Detect WebGPU support
          const hasWebGPU = 'gpu' in navigator;
          
          // For now, use WebGL (WebGPU requires async initialization and is experimental)
          // WebGL is reliable and works on all browsers
          const renderer = new THREE.WebGLRenderer({ 
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
          });

          // Configure renderer
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setClearColor(0x000000, 1);

          // Update renderer info
          const rendererType = hasWebGPU ? 'WebGL (WebGPU available, experimental)' : 'WebGL';
          setRendererInfo(rendererType);

          // Note: WebGPU support in Three.js is experimental and requires async setup
          // For production reliability, WebGL is the recommended choice
          // Future: Can add WebGPU with proper async initialization if needed

          return renderer;
        }}
        camera={{ 
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        onCreated={({ gl, camera }) => {
          // Set camera to look at origin
          camera.lookAt(0, 0, 0);
          
          // Handle window resize
          const handleResize = () => {
            gl.setSize(window.innerWidth, window.innerHeight);
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            if (camera instanceof THREE.PerspectiveCamera) {
              camera.aspect = window.innerWidth / window.innerHeight;
              camera.updateProjectionMatrix();
            }
          };
          window.addEventListener('resize', handleResize);
          
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }}
      >
        <SceneSetup />
      </Canvas>
    </div>
  );
}

