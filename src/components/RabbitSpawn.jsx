import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'

import LoadingIndicator from 'src/components/LoadingIndicator.jsx'

export default function RabbitSpawn() {

    return <>
        {/* Load a box in. The user won't be able to see it, but the rabbit will sit on top of it */}
        <RigidBody type="fixed">
            <mesh geometry={new THREE.BoxGeometry(1, 0.5, 1)} position={[0, 0, 0]} >
                <meshBasicMaterial color="red" wireframe />
            </mesh>
        </RigidBody>

        {/* Load in the loading indicator shader material on a plane on top of the box */}
        <LoadingIndicator position={[0, 0.25, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]} args={[1, 1, 10, 10]} />
    </>
}