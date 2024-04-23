import { OrbitControls } from "@react-three/drei"
import Rabbit from "./Rabbit.jsx"
import LoadingIndicator from "./LoadingIndicator.jsx"

const Experience = () => {
    return (
        <>
            <ambientLight />
            <OrbitControls />
            <group position={[0, -0.4, 0]} scale={0.5} >
                <Rabbit />
                <LoadingIndicator />
            </group>
        </>
    )
}

export default Experience