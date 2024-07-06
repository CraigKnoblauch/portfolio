import { Physics } from "@react-three/rapier"
import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"

import RabbitHoleArea from "src/components/areas/RabbitHoleArea.jsx"
import CareerArea from "src/components/areas/CareerArea.jsx"
import ProjectsArea from "src/components/areas/ProjectsArea.jsx"
import ContactArea from "src/components/areas/ContactArea.jsx"
import HobbiesArea from "src/components/areas/HobbiesArea.jsx"
import RabbitSpawn from "./RabbitSpawn"


export default function Experience() {

    return (
        <>
            <Physics debug={true}>
                <ambientLight />
                <OrbitControls makeDefault />

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