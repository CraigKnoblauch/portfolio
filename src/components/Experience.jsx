import { OrbitControls } from "@react-three/drei"
import Rabbit from "src/components/Rabbit.jsx"
import LoadingIndicator from "src/components/LoadingIndicator.jsx"
import { Physics } from "@react-three/rapier"
import MovementDebugPlane from "src/components/MovementDebugPlane.jsx"
import Ground from "src/components/Ground.jsx"
import RabbitHoleArea from "src/components/areas/RabbitHoleArea.jsx"
import CareerArea from "src/components/areas/CareerArea.jsx"
import ProjectsArea from "src/components/areas/ProjectsArea.jsx"
import ContactArea from "src/components/areas/ContactArea.jsx"
import HobbiesArea from "src/components/areas/HobbiesArea.jsx"
import FloorButton from "src/components/FloorButton.jsx"
import { Suspense } from "react"
import RabbitSpawn from "./RabbitSpawn"

export default function Experience() {

    return (
        <>
            <Physics debug={true}>
                <ambientLight />
                <OrbitControls />

                {/* Load the Rabbit spawn first */}
                <RabbitSpawn />

                {/* Wait for the rest of the areas to load */}
                <Suspense>
                    <RabbitHoleArea />
                    <CareerArea />
                    <HobbiesArea />
                    <ProjectsArea />
                    <ContactArea />
                </Suspense>
            </Physics>
        </>
    )
}