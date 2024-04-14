import { OrbitControls } from "@react-three/drei"
import Rabbit from "./Rabbit.jsx"

const Experience = () => {
    return (
        <>
            <ambientLight />
            <OrbitControls />
            <group position={[0, -0.4, 0]} >
                <Rabbit />
            </group>
        </>
    )
}

export default Experience