/**
 * This function captures the following:
 * 1. Drawing the plane on the ground that shows a border with rounded corners and the appropriate indicator
 * 2. Drawing the enter icon hovering above the floor when the rabbit is in the trigger volume
 * 3. Drawing the floating border when the rabbit is in the trigger volume
 */
import { shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import * as THREE from 'three'

import floorButtonFragmentShader from 'src/shaders/floor-button/fragment.glsl'
import floorButtonVertexShader from 'src/shaders/floor-button/vertex.glsl'

// extend({ FloorButtonMaterial })

export default function FloorButton() {

    const floorButtonMaterial = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: floorButtonVertexShader,
        fragmentShader: floorButtonFragmentShader,
        transparent: true
    })

    return <>
        <group>
            <mesh position={[0, 1, 0]} rotation={[0, Math.PI/4, 0]} material={floorButtonMaterial}>
                <planeGeometry args={[1, 1]} />
                {/* <meshStandardMaterial color="red" /> */}
                {/* <floorButtonMaterial /> */}
            </mesh>
        </group>
    </>
}