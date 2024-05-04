import { OrbitControls } from "@react-three/drei"
import Rabbit from "./Rabbit.jsx"
import LoadingIndicator from "./LoadingIndicator.jsx"
import { Physics } from "@react-three/rapier"
import MovementDebugPlane from "./MovementDebugPlane.jsx"
import Ground from "./Ground.jsx"
import AsuCaption from "./captions/AsuCaption.jsx"
import RabbitHoleArea from "./areas/RabbitHoleArea.jsx"
import CareerArea from "./areas/CareerArea.jsx"
import ProjectsArea from "./areas/ProjectsArea.jsx"
import ContactArea from "./areas/ContactArea.jsx"
import HobbiesArea from "./areas/HobbiesArea.jsx"

const Experience = () => {
    return (
        <>
            <Physics debug={false}>
                <ambientLight />
                <OrbitControls />
                <group>
                    <RabbitHoleArea />
                    <CareerArea />
                    <HobbiesArea />
                    <ProjectsArea />
                    <ContactArea />
                    <MovementDebugPlane />
                    <Rabbit />
                </group>
            </Physics>
        </>
    )
}

export default Experience