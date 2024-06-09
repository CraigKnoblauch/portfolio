import { useTexture } from "@react-three/drei"
import * as THREE from "three"


export default function Caption({x=0, z=0, rotation=0, length=3, width=1, path, textColor="white"}) {

    if (!path) {
        throw Error("path to caption image is required")
    }

    const captionPosition = new THREE.Vector3(x, 0.02, z)
    const captionRotation = new THREE.Euler(-Math.PI/2, 0, rotation)
    const texture = useTexture(path)

    return <>
        <mesh position={captionPosition} rotation={captionRotation}>
            <planeGeometry args={[length, width]} />
            <meshBasicMaterial alphaMap={ texture } transparent={ true } color={textColor} />
        </mesh>
    </>
}