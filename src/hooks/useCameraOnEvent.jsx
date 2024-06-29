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

const useCameraOnEvent = (targetCamera) => {

    const { camera } = useThree()

    const handleEvent = () => {
        console.log("Switch cameras")
    }

    // useEffect(() => {
    //     console.log("useCameraOnEvent")

    //     // Add event listener to the document
    //     console.log("Adding event listener")
    //     let r = document.addEventListener(event, handleEvent);
    //     console.log("added event listener: ", r)

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         console.log("Removing event listener")
    //         document.removeEventListener(event, handleEvent);
    //     };
    // }, [targetCamera, event]);

    return handleEvent
};

export default useCameraOnEvent;