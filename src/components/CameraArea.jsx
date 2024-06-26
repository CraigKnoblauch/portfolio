import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'

import useCameraOnEvent from "src/hooks/useCameraOnEvent.jsx"

function generateGeometryVertices(originalVertices) {
    // Create a copy of the vertices to modify
    const modifiedVertices = new Float32Array(originalVertices.length)
    for (let i = 0; i < originalVertices.length; i++) {
        // Increase the y values by 5
        if ((i + 2) % 3 === 0) {
            modifiedVertices[i] = originalVertices[i] + 5
        } else {
            modifiedVertices[i] = originalVertices[i]
        }
    }

    // Combine the original and modified vertices into a single array
    const vertices = new Float32Array(originalVertices.length * 2)
    vertices.set(originalVertices)
    vertices.set(modifiedVertices, originalVertices.length)

    return vertices
}

function generateGeometryWallIndices(numVerticesHalf) {
    const indices = [];

    for (let i = 0; i < numVerticesHalf - 1; i++) {
        // Bottom vertex index
        const bottomIndex = i;
        // Corresponding top vertex index
        const topIndex = i + numVerticesHalf;

        // Indices for the first triangle
        indices.push(bottomIndex, (bottomIndex + 1), topIndex + 1);

        // Indices for the second triangle
        indices.push(bottomIndex, topIndex + 1, topIndex);
    }

    // Handle the last quad, wrapping around to the first vertex
    indices.push(numVerticesHalf - 1, 0, numVerticesHalf);
    indices.push(numVerticesHalf - 1, numVerticesHalf, (2 * numVerticesHalf) - 1);

    return new Uint16Array(indices);
}

export default function CameraArea({ cameraAreaBase, camera }) {
    // Your component logic here
    console.log("CameraArea", cameraAreaBase)

    // Create a new geometry with the vertices of the camera area base
    const geometry = new THREE.BufferGeometry()

    // Get the vertices for the new geometry, set them
    const vertices = generateGeometryVertices(cameraAreaBase.geometry.attributes.position.array)
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    // Create indices for the geometry, set them
    const indices = generateGeometryWallIndices(cameraAreaBase.geometry.attributes.position.array.length / 3)
    geometry.setIndex(new THREE.BufferAttribute(indices, 1))

    return <>
        <RigidBody type="fixed"
                   onIntersectionEnter={() => {console.log("Camera area entered")}}
                   onIntersectionExit={() => {console.log("Camera area exited")}}
                   sensor={true}
                   colliders="trimesh"
        >
            <mesh geometry={geometry} position={cameraAreaBase.position}>
                <meshBasicMaterial color="red" wireframe />
            </mesh>
        </RigidBody>
    </>
}