import { Canvas } from "@react-three/fiber"
import Experience from "./components/Experience"
import RabbitControlInterface from "./components/RabbitControlInterface"

function App() {

  return (
    <>
      <Canvas camera={{ position: [3, 1, 2], fov: 50 }}>
        <Experience />
      </Canvas>
      <RabbitControlInterface />
    </>
  )
}

export default App
