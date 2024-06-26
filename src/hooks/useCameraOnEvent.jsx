import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const useCameraOnEvent = (targetCamera, event) => {

    const { camera } = useThree()

    useEffect(() => {
        const handleEvent = () => {
            // Handle the event here
            // Switch to the specified camera

            /**
             let pos = new THREE.Vector3().lerpVectors(camera position, target cam position, w);
            let rot = new THREE.Vector3().lerpVectors(camera rot, target cam rot, w);
            camera.position.set(pos.x, pos.y, pos.z);
            camera.rotation.set(rot.x, rot.y, rot.z);
             */
            console.log("Switch cameras")
        };

        // Add event listener to the document
        document.addEventListener(event, handleEvent);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener(event, handleEvent);
        };
    }, [targetCamera, event]);
};

export default useCameraOnEvent;