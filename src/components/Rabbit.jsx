import { RigidBody } from "@react-three/rapier"
import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Rabbit() {

    const body = useRef()
    const model = useGLTF('./models/rabbit.glb')
    const { actions, names } = useAnimations(model.animations, body)
    console.log("Actions: ", actions)

    // Keyboard controls
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    useFrame((state, delta) => {
        const keys = getKeys()

        // Get current position and rotation
        const position = body.current.translation()
        const rotation = body.current.rotation()

        function forward() {
            position.z += Math.cos(rotation.y)*0.1
            position.x += Math.sin(rotation.y)*0.1
        }

        if (keys.forward) {
            forward()
        }
        if (keys.backward) {
            
        }
        if (keys.left) {
            rotation.y += (0.005*Math.PI*2)
            forward()
        }
        if (keys.right) {
            rotation.y -= (0.005*Math.PI*2)
            forward()
        }

        // Update the body position and rotation
        body.current.setTranslation(position)
        body.current.setRotation(rotation)
    })

    console.log(model)

    return <>
        <RigidBody ref={body} 
                   canSleep={false} 
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