import { OrbitControls } from "@react-three/drei"
import Rabbit from "./Rabbit.jsx"
import LoadingIndicator from "./LoadingIndicator.jsx"
import { Physics } from "@react-three/rapier"

const Experience = () => {
    return (
        <>
            <Physics>
                <ambientLight />
                <OrbitControls />
                <group position={[0, -0.4, 0]} scale={0.5} >
                    <Rabbit />
                    <LoadingIndicator />
                </group>
            </Physics>
        </>
    )
}

export default Experience