Notes from that experiment

```jsx
function generateBottomGeometryVerticesGroup(originalVertices) {
    const vertices = new Float32Array(originalVertices.length + 3)
    vertices.set(originalVertices)
    vertices.set(originalVertices.subarray(0, 3), originalVertices.length)
    return vertices
}

function generateTopGeometryVerticesGroup(originalVertices, height) {
    const vertices = new Float32Array(originalVertices.length + 3)
    vertices.set(originalVertices)
    for (let i = 0; i < originalVertices.length; i++) {
        // Increase the y values by height
        if ((i + 2) % 3 === 0) {
            vertices[i] = originalVertices[i] + height
        } else {
            vertices[i] = originalVertices[i]
        }
    }

    // Get the first vertex of the original vertices. Increase the y value by height to elevate it to the correct height
    const firstVertex = originalVertices.subarray(0, 3)
    firstVertex[1] += height

    // Add the first vertex to the end of the vertices array
    vertices.set(firstVertex, originalVertices.length)

    return vertices
}

function generateBottomGeometryCenterVertexGroup(centerPoint, numSegments) {
    // centerPoint is a THREE.Vector3 object
    const vertexGroup = new Float32Array(numSegments * 3)
    for (let i = 0; i < numSegments; i++) {
        vertexGroup[i * 3] = centerPoint.x
        vertexGroup[i * 3 + 1] = centerPoint.y
        vertexGroup[i * 3 + 2] = centerPoint.z
    }

    return vertexGroup
}

function generateTopGeometryCenterVertexGroup(centerPoint, numSegments, height) {
    // centerPoint is a THREE.Vector3 object
    const vertexGroup = new Float32Array(numSegments * 3)
    for (let i = 0; i < numSegments; i++) {
        vertexGroup[i * 3] = centerPoint.x
        vertexGroup[i * 3 + 1] = centerPoint.y + height
        vertexGroup[i * 3 + 2] = centerPoint.z
    }

    return vertexGroup
}

export default function CameraArea({ cameraAreaBase, height=5, camera }) {
    /**
     * Found that there are a few vertex groups in the cylinder geometry's buffer. The index groups are as follows:
     * v = the count of vertices in the camera area base
     * 
     * The first group of vertices is the xyz coordinates for each top vertex, followed by the xyz coordinates of the first vertex.
     * Given these are the top vertices, each y value should be h units higher than the corresponding vertex in the camera area base.
     * i.e. if there were 4 vertices in the camera area base, the first group would be:
     * [x1, y1 + h, z1, x2, y2 + h, z2, x3, y3 + h, z3, x4, y4 + h, z4, x1, y1 + h, z1]
     * This group of vertices starts at index 0 and ends at index [(v + 1) * 3] - 1 = A
     * 
     * The second group of vertices is the xyz coordinates for each bottom vertex, followed by the xyz coordinates of the first vertex in this group.
     * In this case, the bottom vertices are the same as the cameraAreaBase's vertices.
     * i.e. if there were 4 vertices in the camera area base, the second group would be:
     * [x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, x1, y1, z1]
     * This group of vertices starts at index [(v + 1) * 3] and ends at index [(v + 1) * 3 * 2] - 1
     * 
     * The third group of vertices is the xyz coordinates of the center of the top face, repeated v times.
     * i.e. if there were 4 vertices in the camera area base, and the coordinates Cx, Cy + h, Cz represent the center of the top face, the third group would be:
     * [Cx, Cy + h, Cz, Cx, Cy + h, Cz, Cx, Cy + h, Cz, Cx, Cy + h, Cz]
     * This group of vertices starts at index [(v + 1) * 3 * 2] and ends at index [(v + 1) * 3 * 2] + (v * 3) - 1
     * 
     * The fourth group of vertices is the first group again.
     * This group of vertices starts at index [(v + 1) * 3 * 2] + (v * 3) and ends at index [(v + 1) * 3 * 3] + (v * 3) - 1
     * 
     * The fifth group of vertices is the xyz coordinates of the center of the bottom face, repeated v times.
     * In this case, the xyz coordinates of the center of the bottom face are the same as the cameraAreaBase's position.
     * i.e. if there were 4 vertices in the camera area base, and the coordinates Cx, Cy, Cz represent the center of the bottom face, the fifth group would be:
     * [Cx, Cy, Cz, Cx, Cy, Cz, Cx, Cy, Cz, Cx, Cy, Cz]
     * This group of vertices starts at index [(v + 1) * 3 * 3] + (v * 3) and ends at index [(v + 1) * 3 * 3] + (v * 3 * 2) - 1.
     * The final index should be equal to the length of the possition attribute array - 1.
     * 
     * Indexes:
     * A = The first vertex of the second group = [(v + 1) * 3]                                   = A
     * B = The first vertex of the third group  = [(v + 1) * 3 * 2]           = A + [(v + 1) * 3] = B
     * C = The first vertex of the fourth group = [(v + 1) * 3 * 2] + (v * 3) = B + (v * 3)       = C
     * D = The first vertex of the fifth group  = [(v + 1) * 3 * 3] + (v * 3) = C + [(v + 1) * 3] = D
     */
    // Your component logic here
    console.log("CameraArea", cameraAreaBase)

    const cameraAreaBaseVerticesCount = cameraAreaBase.geometry.attributes.position.count
    const cameraAreaBaseVertices = cameraAreaBase.geometry.attributes.position.array
    const cameraAreaBaseCenter = cameraAreaBase.position

    // Create a new cylinder geometry with the same position and num vertices as the camera area base
    const geometry = new THREE.CylinderGeometry(1, 1, height, cameraAreaBaseVerticesCount) // radiusTop, radiusBottom, height, radialSegments
    console.log("geometry", geometry)

    const firstGroup = generateTopGeometryVerticesGroup(cameraAreaBaseVertices, height)
    const secondGroup = generateBottomGeometryVerticesGroup(cameraAreaBaseVertices)
    const thirdGroup = generateTopGeometryCenterVertexGroup(cameraAreaBaseCenter, cameraAreaBaseVerticesCount, height)
    const fourthGroup = firstGroup
    const fifthGroup = generateBottomGeometryCenterVertexGroup(cameraAreaBaseCenter, cameraAreaBaseVerticesCount)

    // Sanity check. The sum of the lengths of these groups = the length of the position attribute array in the geometry
    console.log("My length: ", firstGroup.length + secondGroup.length + thirdGroup.length + fourthGroup.length + fifthGroup.length)
    console.log("Its length: ", geometry.attributes.position.array.length)
```