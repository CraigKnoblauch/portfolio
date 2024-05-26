import { useGLTF, useKeyboardControls, useAnimations } from "@react-three/drei"
import { RapierRigidBody, euler, quat, vec3, RigidBody, CuboidCollider } from "@react-three/rapier"
import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { isMobile } from "react-device-detect"

import { useMobileControlsStore } from "src/stores/useMobileControlsStore.jsx"

export default function Rabbit(props) {

    const model = useGLTF('./models/rabbit.glb')
    const body = useRef()

    const { actions, names } = useAnimations(model.animations, model.scene)

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
            body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
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
        <RigidBody type="dynamic" 
                   ref={ body }
                   colliders={false} 
                   canSleep={false}
                   gravityScale={1}
                //    restitution={0}
                   linearDamping={0.95}
                   angularDamping={0.95}
        >
            <CuboidCollider args={[0.13777, 0.28, 0.325]} position={[props.position[0], props.position[1] + 0.285, props.position[2]]} />
            <primitive object={model.scene} position={props.position} scale={0.25}/>
        </RigidBody>
    </>
}

useGLTF.preload('./models/rabbit.glb')