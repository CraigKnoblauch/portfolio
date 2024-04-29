import { RigidBody } from "@react-three/rapier"
import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Rabbit(props) {

    const group = useRef()
    const body = useRef()
    const model = useGLTF('./models/rabbit.glb')
    const { actions, names } = useAnimations(model.animations, group)
    console.log("Actions: ", actions)

    // Keyboard controls
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    useFrame((state, delta) => {
        const keys = getKeys()

        actions["walk/jump"].play()

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
        <group ref={group} {...props} dispose={null}>
            <RigidBody ref={body} 
                    canSleep={false} 
                    restitution={0.2} 
                    friction={1} 
                    linearDamping={0.5} // The damping allows the ball to come to a stop
                    angularDamping={0.5}
                    gravityScale={0}
                    position={[0, 0, 0]}
            >
                <group ref={group} name="Scene">
                    <group name="metarig" rotation={[0.015, 0, 0]} scale={4.716}>
                    <primitive object={model.nodes.pelvisC} />
                    <primitive object={model.nodes.control_frontl} />
                    <primitive object={model.nodes.pole_target_frontl} />
                    <primitive object={model.nodes.control_frontr} />
                    <primitive object={model.nodes.pole_target_frontr} />
                    <primitive object={model.nodes.control_backl} />
                    <primitive object={model.nodes.pole_backl} />
                    <primitive object={model.nodes.control_backr} />
                    <primitive object={model.nodes.pole_backr} />
                    <group name="rabbit">
                        <skinnedMesh name="Plane" geometry={model.nodes.Plane.geometry} material={model.materials.brown} skeleton={model.nodes.Plane.skeleton} />
                        <skinnedMesh name="Plane_1" geometry={model.nodes.Plane_1.geometry} material={model.materials.white} skeleton={model.nodes.Plane_1.skeleton} />
                        <skinnedMesh name="Plane_2" geometry={model.nodes.Plane_2.geometry} material={model.materials.black} skeleton={model.nodes.Plane_2.skeleton} />
                    </group>
                    </group>
                </group>
                
            </RigidBody>
        </group>
    </>
}