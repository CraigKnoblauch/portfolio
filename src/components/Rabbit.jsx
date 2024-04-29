import { RigidBody } from "@react-three/rapier"
import { useGLTF, useKeyboardControls } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Rabbit() {

    const body = useRef()
    const model = useGLTF('./models/rabbit.glb')

    // Keyboard controls
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    useFrame((state, delta) => {
        const keys = getKeys()

        // Get current position
        const position = body.current.translation()

        if (keys.forward) {
            position.z += 0.1
        }
        if (keys.backward) {
            
        }
        if (keys.left) {
            
        }
        if (keys.right) {
            
        }

        // Update the body position
        body.current.setTranslation(position)
    })

    console.log(model)

    return <>
        <RigidBody ref={body} 
                   canSleep={false} 
                   colliders="ball" 
                   restitution={0.2} 
                   friction={1} 
                   linearDamping={0.5} // The damping allows the ball to come to a stop
                   angularDamping={0.5}
                   gravityScale={0}
                   position={[0, 0, 0]}
         >
            <primitive object={model.scene} />
        </RigidBody>
    </>
}