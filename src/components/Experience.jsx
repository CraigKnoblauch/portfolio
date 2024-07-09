import { Physics } from "@react-three/rapier"
import { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"
import PropTypes from 'prop-types'

import RabbitHoleArea from "src/components/areas/RabbitHoleArea.jsx"
import CareerArea from "src/components/areas/CareerArea.jsx"
import ProjectsArea from "src/components/areas/ProjectsArea.jsx"
import ContactArea from "src/components/areas/ContactArea.jsx"
import HobbiesArea from "src/components/areas/HobbiesArea.jsx"
import RabbitSpawn from "./RabbitSpawn"


export default function Experience( { playerRef } ) {

    console.log("Experience.jsx: playerRef: ", playerRef.current)

    return (
        <>
            <Physics debug={true}>
                <ambientLight />
                <OrbitControls makeDefault />

                {/* Load the Rabbit spawn first */}
                <RabbitSpawn playerRef={playerRef} />

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
Experience.propTypes = {
    playerRef: PropTypes.object.isRequired,
};