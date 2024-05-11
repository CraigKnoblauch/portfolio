import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function Caption({x=0, z=0, rotation=0, path}) {

    if (!path) {
        throw Error("path to caption image is required")
    }

    const captionPosition = new THREE.Vector3(x, 0.05, z)
    const captionRotation = new THREE.Euler(-Math.PI/2, 0, rotation)
    const texture = useTexture(path)

    return <>
        <mesh position={captionPosition} rotation={captionRotation}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial alphaMap={ texture } transparent={ true } color="blue"/>
        </mesh>
    </>
}