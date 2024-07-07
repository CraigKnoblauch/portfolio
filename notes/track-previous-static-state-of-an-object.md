# Track the previous static state of an object. 
TODO structure algo dev, testing (check notebook)

Here's some code:
```jsx
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'


class CameraRecord {
    constructor(camera, prev) {
        this.camera = camera
        this.prev = prev
    }

    equals(cameraRecord) {
        // Currently comparing position. That's not a good enough solution for the long term
        return this.camera.position.equals(cameraRecord.camera.position)
    }
}

const useLastCamera = () => {

    const { camera } = useThree()
    
    const head = useRef(new CameraRecord(camera, null)) // HEAD
    const lastCamera = useRef(null)                     // A
    const suspectedLastCamera = useRef(null)            // B

    useFrame((state, delta) => {

        /**
         * TODO Structure and algo explanation
         */
        if (head.current.prev.equals(null)) {

            lastCamera.current = head.current

        } else {

            // Set head to a new record with the current camera
            let prev = head.current
            head.current = new CameraRecord(camera, prev)

            if (head.current.prev.equals(head.current)) {

                if (suspectedLastCamera.current == null) {

                    suspectedLastCamera.current = head.current

                }

            } else {

                if (suspectedLastCamera.current != null) {

                    lastCamera.current = suspectedLastCamera.current
                    suspectedLastCamera.current = null

                }

            }
        }
        
    })

    const getLastCamera = () => {

        return lastCamera.current

    }

    return getLastCamera
};

export default useLastCamera;
```