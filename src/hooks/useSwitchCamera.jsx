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

    const { camera, controls } = useThree()

    const smoothedTargetCameraPosition = useRef(new THREE.Vector3())
    const smoothedTargetCameraRotation = useRef(new THREE.Quaternion()) // Used to avoid gimbal lock when rotating the camera
    const smoothedTargetCameraFov = useRef(0)
    const smoothedTargetCameraFocalLength = useRef(0)

    const goForSwitch = useRef(false)

    useFrame((state, delta) => {
        /**
         * Smoothly interpolate the camera to the target camera configuration
         */
        if (goForSwitch.current) {

            // NOTE TODO Seeing a bug where the camera is not interpolating when revisiting an area
            if (state.camera.position.distanceTo(targetCamera.position) >= 0.01) {
                
                // Calculate a new position, rotation , fov, and focal length for the camera. 
                // Each calculation is one step on the way to the target camera's configuration
                const targetCameraPosAsVec3 = new THREE.Vector3().copy(targetCamera.position)
                smoothedTargetCameraPosition.current.lerp(targetCameraPosAsVec3, 3 * delta)

                const targetCameraRotAsQuat = new THREE.Quaternion().setFromEuler(targetCamera.rotation)
                smoothedTargetCameraRotation.current.slerp(targetCameraRotAsQuat, 3 * delta)

                smoothedTargetCameraFov.current = THREE.MathUtils.lerp(state.camera.fov, targetCamera.fov, 3 * delta)

                smoothedTargetCameraFocalLength.current = THREE.MathUtils.lerp(state.camera.getFocalLength(), targetCamera.getFocalLength(), 3 * delta)
                
                // Set the camera's new position
                state.camera.position.copy(smoothedTargetCameraPosition.current)

                /**
                 * Different solutions for setting camera rotation. Camera seemed to look at origin no matter what when move is done.
                 * OrbitControls was causing that. Making Orbit Controls default with makeDefault allowed me to use controls from Three to update the camera target
                 */
                // NOTE Camera seems to default back to last lookAt position after setting rotation. Therefore I'm changing the look at location each time
                const smoothedLookAtPosition = new THREE.Vector3(0, 0, -1).applyQuaternion(smoothedTargetCameraRotation.current).add(state.camera.position);
                state.camera.lookAt(smoothedLookAtPosition);
                
                // Update the controls target so the camera doesn't snap back to the origin when the rotation isn't being constantly updated.
                controls.target = smoothedLookAtPosition

                /**
                 * Other solutions I'm keeping here for reference. The downside of these is that
                 * they don't give a position that will allow an update of the controls' target
                 */
                // state.camera.rotation.setFromQuaternion(smoothedTargetCameraRotation.current)
                // state.camera.quaternion.copy(smoothedTargetCameraRotation.current)

                /**********************************************************************************************************************8 */

                // Set the camera's new fov and focal length
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
    }

    return swithCamera
};

export default useSwitchCamera;