import { OrbitControls } from "@react-three/drei"
import Rabbit from "./Rabbit.jsx"
import LoadingIndicator from "./LoadingIndicator.jsx"
import { Physics } from "@react-three/rapier"
import MovementDebugPlane from "./MovementDebugPlane.jsx"
import Ground from "./Ground.jsx"

const Experience = () => {
    return (
        <>
            <Physics debug={true}>
                <ambientLight />
                <OrbitControls />
                <group position={[0, -0.4, 0]}>
                    <Ground />
                    <MovementDebugPlane />
                    <Rabbit />
                </group>
            </Physics>
        </>
    )
}

export default Experience