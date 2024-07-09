import { useGLTF, useKeyboardControls, useAnimations, useTexture } from "@react-three/drei"
import { quat, vec3, RigidBody, CuboidCollider } from "@react-three/rapier"
import { useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { isMobile } from "react-device-detect"
import PropTypes from 'prop-types'

import { useMobileControlsStore } from "src/stores/useMobileControlsStore.jsx"
import { useCameraStore } from "../stores/useCameraStore"
import useSwitchCamera from "../hooks/useSwitchCamera"


export default function Rabbit(props) {

    const model = useGLTF('./models/rabbit.glb')
    const body = props.playerRef
    
    const rabbitShadowTexture = useTexture('./textures/rabbit-shadow.png')

    const { actions } = useAnimations(model.animations, model.scene)
    const [isMoving, setIsMoving] = useState(false)

    const [ smoothCameraPosition ] = useState(() => new THREE.Vector3(3, 1, 2))
    const [ smoothCameraTarget ] = useState(() => new THREE.Vector3())

    /**
     * Load the camera object that follows the rabbit
     */
    const addCamera = useCameraStore((state) => state.addCamera)
    const rabbitCameraModel = useGLTF('./models/rabbit-camera.glb')
    const rabbitCameraRef = useRef(rabbitCameraModel.nodes.rabbit_camera)
    addCamera(rabbitCameraRef.current)
    const cameraOffsetRef = useRef(new THREE.Vector3())
    const switchCamera = useSwitchCamera(rabbitCameraRef.current)
    switchCamera()

    // useEffect from the docs: https://pmndrs.github.io/react-three-rapier/#moving-things-around-and-applying-forces
    useEffect(() => {
        if (body.current) {
            const position = vec3(body.current.translation());
            const quaternion = quat(body.current.rotation());
      
            // While Rapier's return types need conversion, setting values can be done directly with THREE.js types
            body.current.setTranslation(position, true);
            body.current.setRotation(quaternion, true);
            body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

            // Calculate the differnce in positions between the rabbit and its camera
            cameraOffsetRef.current = rabbitCameraRef.current.position.sub(vec3(body.current.translation()))
        }
    }, [])

    useEffect(() => {
        // Play the walk animation if the rabbit is moving
        if(isMoving) {
            actions["walk/jump"].reset().fadeIn(0.1).play()
        }

        // Fade out the walk animation if the rabbit is not moving
        return () => {actions["walk/jump"].fadeOut(0.5)}

    }, [isMoving, actions]) // [] means run when that var changes

    /**
     * The React docs very explicitly state that hooks should not be called conditionally
     * https://legacy.reactjs.org/docs/hooks-rules.html
     * 
     * Therefore, call both hooks for mobile and desktop control
     */
    // eslint-disable-next-line no-unused-vars
    const [ subscribeKeys, getKeys ] = useKeyboardControls()
    const mobileControls = useMobileControlsStore()
    useFrame((state, delta) => {

        /**
         * Camera
         */
        const bodyPosition = body.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.add(cameraOffsetRef.current)

        // TODO the camera target isn't necessarily the rabbit. It's more like a point at infinity that is
        // along a normal vector drawn from the rabbit's camera. That way the rabbit doesn't have to be centered
        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        // cameraTarget.y += 0.25

        // Smooth out camera animations by lerping
        // Use of delta ensures movement is consistent across all systems
        smoothCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothCameraTarget.lerp(cameraTarget, 5 * delta)

        // If the state camera is the rabbit camera, update its position
        if (state.camera.name == rabbitCameraRef.current.name) {
            state.camera.position.copy(smoothCameraPosition)
            state.camera.lookAt(smoothCameraTarget)
        }

        // Get the direction vector for the camera
        const cameraDirection = new THREE.Vector3()
        cameraDirection.subVectors(cameraTarget, state.camera.position).negate().normalize()

        function translate(directionScalar) { // translate instead and use 1 for forward, -1 for backward

            // Label the rabbit as moving
            setIsMoving(true)

            // Define the forward vector
            const forwardVector = new THREE.Vector3(0, 0, directionScalar);
            
            // Rotate the forward vector by the current quaternion rotation
            forwardVector.applyQuaternion(
                quat(body.current.rotation())
            );
            
            // Define movement speed
            const speed = 1.5; // Adjust speed as needed
            
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

            translate(1)

        } else if (direction === "backward") {

            translate(-1)

        } else if (direction === "left") {

            turn(new THREE.Vector3(0, 1, 0))
            translate(1)

        } else if (direction === "right") {

            turn(new THREE.Vector3(0, -1, 0))
            translate(1)

        } else {

            setIsMoving(false)

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
                    userData={{ rabbitRef: body }} // Include a body ref so receivers can manipulate the rabbit. NOTE TODO not a good solution. Can easily lead to side effects.
            >
                <CuboidCollider args={[0.13777, 0.28, 0.325]} position={[props.position[0], props.position[1] + 0.285, props.position[2]]} />
                <primitive object={model.scene} position={props.position} scale={0.25}/>

                {/* "Shadow" */}
                <mesh position={ [
                            props.position[0], 
                            0.01, 
                            props.position[2]
                        ]} 
                        rotation={[-Math.PI/2, 0, 0]} 
                        scale={0.75}
                >
                    <planeGeometry args={[1, 1]}/>
                    <meshBasicMaterial map={rabbitShadowTexture} transparent opacity={0.5} />
                </mesh>
            </RigidBody>
    </>
}
Rabbit.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number),
    playerRef: PropTypes.object.isRequired,
}

useGLTF.preload('./models/rabbit.glb')
useGLTF.preload('./models/rabbit-camera.glb')