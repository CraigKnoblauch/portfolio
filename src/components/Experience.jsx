import { OrbitControls } from "@react-three/drei"
import Rabbit from "./Rabbit.jsx"
import LoadingIndicator from "./LoadingIndicator.jsx"
import { Physics } from "@react-three/rapier"
import MovementDebugPlane from "./MovementDebugPlane.jsx"
import Ground from "./Ground.jsx"
import AsuCaption from "./captions/AsuCaption.jsx"
import RabbitHoleArea from "./areas/RabbitHoleArea.jsx"

const Experience = () => {
    return (
        <>
            <Physics debug={true}>
                <ambientLight />
                <OrbitControls />
                <group>
                    <RabbitHoleArea />
                    <MovementDebugPlane />
                    <Rabbit />
                </group>
            </Physics>
        </>
    )
}

export default Experience