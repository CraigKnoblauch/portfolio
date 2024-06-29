import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'

import useSwitchCamera from "src/hooks/useSwitchCamera.jsx"


export default function CameraZone({ cameraZoneBase, height=5, camera }) {

    const cameraZoneBaseVertices = cameraZoneBase.geometry.attributes.position.array
    const cameraZoneBaseCenter = cameraZoneBase.position

    let points = [] 
    for(let i = 0; i < cameraZoneBaseVertices.length; i += 3) {
        let newPoint = new THREE.Vector2(cameraZoneBaseVertices[i], cameraZoneBaseVertices[i+2]) // capture points x and z
        points.push(newPoint)
    }

    // Create three shape with points array
    const shape = new THREE.Shape(points)

    // Define extrusion options
    const extrudeOptions = {
        steps: 1,
        depth: height,
        bevelEnabled: false
    }

    // Create an extrusion goemetry from the shape
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeOptions)

    const switchCamera = useSwitchCamera(camera)

    return <>
        {/* Using onCollisionExit only fires if the player has completely entered or completely exited the zone */}
        <RigidBody type="fixed"
                   onCollisionExit={switchCamera} 
                   sensor={true}
                   colliders="trimesh"
        >
            <mesh geometry={geometry} position={cameraZoneBaseCenter} rotation={[-Math.PI/2, 0, 0]}> 
                <meshBasicMaterial color="red" wireframe />
            </mesh>
        </RigidBody>
    </>
}