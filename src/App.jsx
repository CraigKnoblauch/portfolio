import { Canvas } from "@react-three/fiber"
import Experience from "src/components/Experience.jsx"
import { KeyboardControls } from "@react-three/drei"
import { isMobile } from "react-device-detect"
import MobileInterface from "src/components/MobileInterface.jsx"


function App() {

  return (
    <>
      <KeyboardControls
        map={ [
          { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
          { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
          { name: 'left', keys: [ 'ArrowLeft', 'KeyA' ] },
          { name: 'right', keys: [ 'ArrowRight', 'KeyD' ] }
        ] }
      >
        {/* NOTE Camera position to debug rocket: [3, 3, -40] */}
        <Canvas camera={{ position: [3, 1, 2], fov: 50 }}>
          <Experience />
        </Canvas>
        {/* <RabbitControlInterface /> */}
      </KeyboardControls>  
      {isMobile && <MobileInterface />}
    </>
  )
}

export default App
