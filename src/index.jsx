import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { MantineProvider } from "@mantine/core";
import Experience from './Experience.jsx'
import RabbitControlInterface from './RabbitControlInterface.jsx'
import { CharacterAnimationsProvider } from './contexts/CharacterAnimations.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (_theme) => ({
          body: {
            width: "100vw",
            height: "100vh",
          },
          "#root": {
            width: "100%",
            height: "100%",
          },
        }),
      }}
    >
        <CharacterAnimationsProvider>
            <Canvas
                flat // tone mapping 
                camera={ {
                    fov: 50,
                    near: 0.1,
                    far: 200,
                    position: [ 1, 1.5, 2.5 ]
                } }
            >
                <Experience />
            </Canvas>
            <RabbitControlInterface />
        </CharacterAnimationsProvider>
    </MantineProvider>
)