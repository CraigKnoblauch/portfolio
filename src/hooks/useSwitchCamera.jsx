import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

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

    const swithCamera = () => {
        console.log("Switch cameras")
    }

    return swithCamera
};

export default useSwitchCamera;