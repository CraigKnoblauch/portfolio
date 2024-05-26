import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'

import LoadingIndicator from 'src/components/LoadingIndicator.jsx'
import Rabbit from 'src/components/Rabbit.jsx'

export default function RabbitSpawn() {

    const platformHeight = 1

    return <>
        {/* Load a box in. The user won't be able to see it, but the rabbit will sit on top of it */}
        <RigidBody type="fixed">
            <mesh geometry={new THREE.BoxGeometry(2, platformHeight, 2)} position={[0, -platformHeight/2, 0]} transparent >
                {/* Keeping material for debugging. TODO Remove or comment out in v1.0 */}
                <meshBasicMaterial transparent opacity={0} /> 
            </mesh>
        </RigidBody>

        {/* Load in the loading indicator shader material on a plane on top of the box */}
        <LoadingIndicator position={[0, 0.001, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]} args={[2, 2, 10, 10]} />

        <Suspense>
            <Rabbit position={[0, 0.002, 0]} />
        </Suspense>
    </>
}