import * as THREE from 'three'

import useCameraOnEvent from "src/hooks/useCameraOnEvent.jsx"

export default function CameraArea({ cameraAreaBase, camera }) {
    // Your component logic here
    console.log("CameraArea", cameraAreaBase)

    // Get the vertices of the camera area base
    const cameraAreaBaseVertices = cameraAreaBase.geometry.attributes.position.array

    // Create a copy of the vertices to modify
    const modifiedVertices = new Float32Array(cameraAreaBaseVertices.length)
    for (let i = 0; i < cameraAreaBaseVertices.length; i++) {
        // Increase the y values by 5
        if ((i + 2) % 3 === 0) {
            modifiedVertices[i] = cameraAreaBaseVertices[i] + 5
        } else {
            modifiedVertices[i] = cameraAreaBaseVertices[i]
        }
    }

    // Combine the original and modified vertices into a single array
    const vertices = new Float32Array(cameraAreaBaseVertices.length * 2)
    vertices.set(cameraAreaBaseVertices)
    vertices.set(modifiedVertices, cameraAreaBaseVertices.length)

    // Create a geometry with the combined vertices
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    return <>
        <mesh geometry={geometry} position={cameraAreaBase.position}>
            <meshBasicMaterial color="red" />
        </mesh>
    </>
}