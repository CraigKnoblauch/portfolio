import { RapierRigidBody, euler, quat, vec3, RigidBody, CuboidCollider } from "@react-three/rapier" // NOTE Rapier RigidBody docs: https://rapier.rs/docs/api/javascript/JavaScript3D
import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useMobileControlsStore } from "src/stores/useMobileControlsStore.jsx"
import { isMobile } from "react-device-detect"

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

    /**
     * The React docs very explicitly state that hooks should not be called conditionally
     * https://legacy.reactjs.org/docs/hooks-rules.html
     * 
     * Therefore, call both hooks for mobile and desktop control
     */
    const mobileControls = useMobileControlsStore()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    useFrame((state, delta) => {

        function forward() {

            // Define the forward vector
            const forwardVector = new THREE.Vector3(0, 0, 1);
            
            // Rotate the forward vector by the current quaternion rotation
            forwardVector.applyQuaternion(
                quat(body.current.rotation())
            );
            
            // Define movement speed
            const speed = 1; // Adjust speed as needed
            
            // Calculate the new position
            const newPosition = vec3(body.current.translation())
            newPosition.add(forwardVector.multiplyScalar(speed * delta));
            
            // Update the object's position
            body.current.setTranslation(newPosition);

        }

        function turn(direction) {

            const rotationQuaternion = quat(body.current.rotation())
            const rotationDelta = new THREE.Quaternion().setFromAxisAngle(direction, delta)
            rotationQuaternion.multiply(rotationDelta)
            body.current.setRotation(rotationQuaternion)

        }

        // actions["walk/jump"].play()

        /**
         * Determine the direction the rabbit should move in
         * 
         * TODO What if the user is holding "right" + "forward"?
         * TODO What if the user is holding another combination of keys?
         */
        let direction = ""
        if (isMobile) {

            direction = mobileControls.direction.toLowerCase()

        } else {

            const keys = getKeys()
            if (keys.forward) {
                direction = "forward"
            }
            if (keys.backward) {
                direction = "backward"
            }
            if (keys.left) {
                direction = "left"
            }
            if (keys.right) {
                direction = "right"
            }

        }

        /**
         * Move the rabbit
         */
        if (direction === "forward") {

            forward()

        } else if (direction === "backward") {

            // TODO

        } else if (direction === "left") {

            turn(new THREE.Vector3(0, 1, 0))
            forward()

        } else if (direction === "right") {

            turn(new THREE.Vector3(0, -1, 0))
            forward()

        }

    })

    return <>
        <group ref={group} {...props} dispose={null}>
            <RigidBody ref={body} 
                       type="dynamic"
                    canSleep={false} 
                    friction={0} 
                    // linearDamping={0.5}
                    // angularDamping={0.5}
                    gravityScale={1}
                    position={[0, 0.25, 0]}
                    colliders={false}
            >
                <CuboidCollider args={[0.13777, 0.28, 0.325]} position={[0, 0.285, 0]} />
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