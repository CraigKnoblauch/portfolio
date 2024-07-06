import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Handle the event here
// Switch to the specified camera

/**
 let pos = new THREE.Vector3().lerpVectors(camera position, target cam position, w);
let rot = new THREE.Vector3().lerpVectors(camera rot, target cam rot, w);
camera.position.set(pos.x, pos.y, pos.z);
camera.rotation.set(rot.x, rot.y, rot.z);
    */

const useSwitchCamera = (targetCamera) => {

    const { camera } = useThree()

    const smoothedTargetCameraPosition = useRef(new THREE.Vector3())
    const smoothedTargetCameraRotation = useRef(new THREE.Quaternion())
    const smoothedTargetCameraFov = useRef(0)
    const smoothedTargetCameraFocalLength = useRef(0)

    const goForSwitch = useRef(false)

    useFrame((state, delta) => {
        /**
         * Smoothly interpolate the camera to the target camera position
         */
        if (goForSwitch.current) {

            // NOTE TODO Seeing a bug where the camera is not interpolating when revisiting an area
            if (state.camera.position.distanceTo(targetCamera.position) >= 0.01) {
                
                const targetCameraPosAsVec3 = new THREE.Vector3().copy(targetCamera.position)
                smoothedTargetCameraPosition.current.lerp(targetCameraPosAsVec3, 3 * delta)

                const targetCameraRotAsQuat = new THREE.Quaternion().setFromEuler(targetCamera.rotation)
                smoothedTargetCameraRotation.current.slerp(targetCameraRotAsQuat, 3 * delta)

                smoothedTargetCameraFov.current = THREE.MathUtils.lerp(state.camera.fov, targetCamera.fov, 3 * delta)

                smoothedTargetCameraFocalLength.current = THREE.MathUtils.lerp(state.camera.getFocalLength(), targetCamera.getFocalLength(), 3 * delta)
                
                state.camera.position.copy(smoothedTargetCameraPosition.current)

                /**
                 * Different solutions for setting camera rotation. Camera seems to look at origin no matter what when move is done.
                 * OrbitControls is causing that. May need some system to have the camera constant look at the last lookAt position if the user isn't controlling it
                 */
                // NOTE Camera seems to default back to last lookAt position after setting rotation. Therefore I'm changing the look at location each time
                const smoothedLookAtPosition = new THREE.Vector3(0, 0, -1).applyQuaternion(smoothedTargetCameraRotation.current).add(state.camera.position);
                state.camera.lookAt(smoothedLookAtPosition);

                // state.camera.rotation.setFromQuaternion(smoothedTargetCameraRotation.current)
                // state.camera.quaternion.copy(smoothedTargetCameraRotation.current)

                /**********************************************************************************************************************8 */

                state.camera.fov = smoothedTargetCameraFov.current
                state.camera.setFocalLength(smoothedTargetCameraFocalLength.current)

                // goForSwitch.current = false

            } else {

                console.debug("Position found")
                goForSwitch.current = false

            }
            console.log("Position: ", state.camera.position)
            console.log("Rotation: ", state.camera.rotation)
        }
        
    })

    const swithCamera = () => {
        goForSwitch.current = true
        // /**
        //  * I'm not actually switching a camera. I'm lerping the current camera to the target camera's position and rotation
        //  * TODO move the camera back to the default position and rotation if the current camera is the target camera on this event
        //  * Above is going to require a way to store the default position and rotation of the camera, and the ability to get the location of the rabbit (without coupling to it)
        //  */
        // let pos = new THREE.Vector3().lerpVectors(camera.position, targetCamera.position, 1);
        // let rot = new THREE.Vector3().lerpVectors(camera.rotation, targetCamera.rotation, 1);
        // camera.position.lerp(pos, 0.4);
        // camera.rotation.lerp(rot, 0.4);
    }

    return swithCamera
};

export default useSwitchCamera;