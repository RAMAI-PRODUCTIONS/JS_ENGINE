import { Canvas } from '@react-three/fiber';

export default function App() {
  return (
    <Canvas>
      <color attach="background" args={['#000000']} />
      {/* Add your 3D objects here */}
    </Canvas>
  );
}

