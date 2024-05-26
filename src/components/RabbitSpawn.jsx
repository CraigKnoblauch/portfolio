import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { Suspense } from 'react'
import { useProgress } from '@react-three/drei'

import LoadingIndicator from 'src/components/LoadingIndicator.jsx'
import Rabbit from 'src/components/Rabbit.jsx'
import { useFrame } from '@react-three/fiber'

export default function RabbitSpawn() {

    const platformHeight = 1
    const { active } = useProgress()

    return <>
        {/* Load a box in. The user won't be able to see it, but the rabbit will sit on top of it */}
        <RigidBody type="fixed">
            <mesh geometry={new THREE.BoxGeometry(2, platformHeight, 2)} position={[0, -platformHeight/2, 0]} transparent >
                {/* Keeping material for debugging. TODO Remove or comment out in v1.0 */}
                <meshBasicMaterial transparent opacity={0} /> 
            </mesh>
        </RigidBody>

        {/* Load in the loading indicator shader material on a plane on top of the box. Despawn when everything is loaded */}
        {active && (
            <LoadingIndicator position={[0, 0.001, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]} args={[2, 2, 10, 10]} />
        )}

        <Suspense>
            <Rabbit position={[0, 0.002, 0]} />
        </Suspense>
    </>
}