import { useThree } from "@react-three/fiber";

import { useCameraStore } from "src/stores/useCameraStore"

const useLastCamera = () => {

    const { camera } = useThree()
    const { getCameraByName } = useCameraStore()
    
    const getLastCamera = () => {

        return getCameraByName(camera.name)

    }

    return getLastCamera
};

export default useLastCamera;