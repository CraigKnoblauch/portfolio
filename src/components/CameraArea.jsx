import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'

import useCameraOnEvent from "src/hooks/useCameraOnEvent.jsx"


export default function CameraArea({ cameraAreaBase, height=5, camera }) {

    const cameraAreaBaseVertices = cameraAreaBase.geometry.attributes.position.array
    const cameraAreaBaseCenter = cameraAreaBase.position

    let points = [] 
    for(let i = 0; i < cameraAreaBaseVertices.length; i += 3) {
        let newPoint = new THREE.Vector2(cameraAreaBaseVertices[i], cameraAreaBaseVertices[i+2]) // capture points x and z
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

    return <>
        <RigidBody type="fixed"
                   onIntersectionEnter={() => {console.log("Camera area entered")}}
                   onIntersectionExit={() => {console.log("Camera area exited")}}
                   sensor={true}
                   colliders="trimesh"
        >
            <mesh geometry={geometry} position={cameraAreaBaseCenter} rotation={[-Math.PI/2, 0, 0]}> 
                <meshBasicMaterial color="red" wireframe />
            </mesh>
        </RigidBody>
    </>
}