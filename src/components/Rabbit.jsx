import { RigidBody } from "@react-three/rapier" // NOTE Rapier RigidBody docs: https://rapier.rs/docs/api/javascript/JavaScript3D
import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Rabbit(props) {

    const group = useRef()
    const body = useRef()
    const model = useGLTF('./models/rabbit.glb')
    const { actions, names } = useAnimations(model.animations, group)

    // Keyboard controls
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    useFrame((state, delta) => {
        const keys = getKeys()

        // actions["walk/jump"].play()

        // Get current rotation
        const rotation = body.current.rotation()

        const impulse = {x: 0, y: 0, z: 0}
        const torque = {x: 0, y: 0, z: 0}

        function forward() {
            impulse.z += Math.cos(rotation.y) * delta * 8000
            impulse.x += Math.sin(rotation.y) * delta * 8000
        }

        if (keys.forward) {
            forward()
        }
        if (keys.backward) {
            
        }
        if (keys.left) {
            torque.y += 1 * delta * 50000
            // forward()
        }
        if (keys.right) {
            torque.y -= 1 * delta * 50000
            // forward()
        }

        // Update the body position and rotation
        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)
    })

    return <>
        <group ref={group} {...props} dispose={null}>
            <RigidBody ref={body} 
                    canSleep={false} 
                    restitution={0.2} 
                    friction={0.1} 
                    linearDamping={0.5}
                    angularDamping={0.5}
                    gravityScale={1}
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