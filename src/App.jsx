import { Canvas } from "@react-three/fiber"
import Experience from "./components/Experience"

function App() {

  return (
    <>
      <Canvas camera={{ position: [3, 1, 2], fov: 50 }}>
        <Experience />
      </Canvas>
    </>
  )
}

export default App
