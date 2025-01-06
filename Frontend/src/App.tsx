import './App.css'
import { Canvas } from '@react-three/fiber'

function App() {

  return (
    <div id="canvas_container">
      <Canvas>
        <mesh>
          <boxGeometry />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App
