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
    const smoothedTargetCameraRotation = useRef(new THREE.Vector3())

    const goForSwitch = useRef(false)

    useFrame((state, delta) => {
        /**
         * Smoothly interpolate the camera to the target camera position
         */
        if (goForSwitch.current) {

            // NOTE TODO This check may never fail after move. Not sure
            if (state.camera.position != targetCamera.position || state.camera.rotation != targetCamera.rotation) {
                
                const targetCameraPosAsVec3 = new THREE.Vector3().copy(targetCamera.position)
                smoothedTargetCameraPosition.current.lerp(targetCameraPosAsVec3, 3 * delta)

                const targetCameraRotAsVec3 = new THREE.Vector3().setFromEuler(targetCamera.rotation)
                smoothedTargetCameraRotation.current.lerp(targetCameraRotAsVec3, 3 * delta)
                
                state.camera.position.copy(smoothedTargetCameraPosition.current)
                state.camera.rotation.setFromVector3(smoothedTargetCameraRotation.current)

                // TODO interpolate FOV if want to keep the cameras in the same position

                console.log("rotation: ", state.camera.rotation)
                // goForSwitch.current = false

            } else {

                goForSwitch.current = false

            }
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