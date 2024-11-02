import { Canvas } from "@react-three/fiber"
import Experience from "src/components/Experience.jsx"
import { KeyboardControls } from "@react-three/drei"
import { useProgress } from "@react-three/drei"
import { isMobile } from "react-device-detect"
import MobileInterface from "src/components/MobileInterface.jsx"
import FrontPage from "./components/FrontPage"

function App() {

  let { loaded } = useProgress()

  return (
    <>
      <FrontPage isLoaded={loaded}/>
      <KeyboardControls
        map={ [
          { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
          { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
          { name: 'left', keys: [ 'ArrowLeft', 'KeyA' ] },
          { name: 'right', keys: [ 'ArrowRight', 'KeyD' ] },
          { name: 'enter', keys: [ 'Enter' ] }
        ] }
      >
        {/* NOTE Camera position to debug rocket: [3, 3, -40] */}
        {/* NOTE Camera position to debug flames shader: [1.6, 5.9, -32.4] */}
        {/* NOTE Starting camera position before beta release: [3, 1, 2] */}
        <Canvas camera={{ position: [3, 1, 2], fov: 50 }}>
          <Experience />
        </Canvas>

      </KeyboardControls> 
      {isMobile && <MobileInterface />} 
      
    </>
  )
}

export default App
