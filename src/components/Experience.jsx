import { OrbitControls } from "@react-three/drei"
import Rabbit from "src/components/Rabbit.jsx"
import LoadingIndicator from "src/components/LoadingIndicator.jsx"
import { Physics } from "@react-three/rapier"
import MovementDebugPlane from "src/components/MovementDebugPlane.jsx"
import Ground from "src/components/Ground.jsx"
import AsuCaption from "src/components/captions/AsuCaption.jsx"
import RabbitHoleArea from "src/components/areas/RabbitHoleArea.jsx"
import CareerArea from "src/components/areas/CareerArea.jsx"
import ProjectsArea from "src/components/areas/ProjectsArea.jsx"
import ContactArea from "src/components/areas/ContactArea.jsx"
import HobbiesArea from "src/components/areas/HobbiesArea.jsx"
import ProceduralCareerArea from "src/components/areas/ProceduralCareerArea"

const Experience = () => {
    return (
        <>
            <Physics debug={true}>
                <ambientLight />
                <OrbitControls />
                <group>
                    <RabbitHoleArea />
                    {/* <CareerArea /> */}
                    <ProceduralCareerArea />
                    <HobbiesArea />
                    <ProjectsArea />
                    <ContactArea />
                    {/* <MovementDebugPlane */}
                    <Rabbit />
                </group>
            </Physics>
        </>
    )
}

export default Experience