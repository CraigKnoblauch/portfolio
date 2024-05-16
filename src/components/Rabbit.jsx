import { RapierRigidBody, euler, quat, vec3, RigidBody, CuboidCollider } from "@react-three/rapier" // NOTE Rapier RigidBody docs: https://rapier.rs/docs/api/javascript/JavaScript3D
import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Rabbit(props) {

    const group = useRef()
    const body = useRef()
    const model = useGLTF('./models/rabbit.glb')
    const { actions, names } = useAnimations(model.animations, group)

    // useEffect from the docs: https://pmndrs.github.io/react-three-rapier/#moving-things-around-and-applying-forces
    useEffect(() => {
        if (body.current) {
            const position = vec3(body.current.translation());
            const quaternion = quat(body.current.rotation());
            const eulerRot = euler().setFromQuaternion(
              quat(body.current.rotation())
            );
      
            // While Rapier's return types need conversion, setting values can be done directly with Three.js types
            body.current.setTranslation(position, true);
            body.current.setRotation(quaternion, true);
            body.current.setAngvel({ x: 0, y: 2, z: 0 }, true);
        }
    }, [])

    // Keyboard controls
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    useFrame((state, delta) => {
        const keys = getKeys()

        // actions["walk/jump"].play()

        const impulse = {x: 0, y: 0, z: 0}
        const torque = {x: 0, y: 0, z: 0}

        function forward() {

            // Get current rotation as an euler
            const rotation = euler().setFromQuaternion(
                quat(body.current.rotation())
              );

            // Get current position
            const position = body.current.translation()

            position.z += Math.cos(rotation.y) * delta 
            position.x += Math.sin(rotation.y) * delta

            body.current.setTranslation(position)

        }

        function turn(direction) {
            if (direction === "right") {
                direction = -1
            } else {
                direction = 1
            }

            // Get current rotation as an euler
            const rotation = euler().setFromQuaternion(
                quat(body.current.rotation())
              );

            rotation.y += direction * delta

            body.current.setRotation(quat().setFromEuler(rotation))
        }

        if (keys.forward) {
            forward()
        }
        if (keys.backward) {
            
        }
        if (keys.left) {
            turn("left")
        }
        if (keys.right) {
            turn("right")
        }

        // Update the body position and rotation
        // body.current.applyImpulse(impulse)
        // body.current.applyTorqueImpulse(torque)
    })

    return <>
        <group ref={group} {...props} dispose={null}>
            <RigidBody ref={body} 
                       type="kinematicPositionBased"
                    canSleep={false} 
                    friction={0} 
                    // linearDamping={0.5}
                    // angularDamping={0.5}
                    gravityScale={1}
                    position={[0, 0.25, 0]}
                    // colliders={false}
            >
                {/* <CuboidCollider args={[0.13777, 0.28, 0.3]} position={[0, 0.285, 0]} /> */}
                <group ref={group} name="Scene">
                    <group name="metarig" rotation={[0.015, 0, 0]} scale={1}>
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