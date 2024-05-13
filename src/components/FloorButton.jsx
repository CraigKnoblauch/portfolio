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

export default function FloorButton({mesh_obj}) {

    const texture = new THREE.TextureLoader().load('./textures/outbound-link-icon.png')

    const floorButtonMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uTexture: { value: texture }
        },
        vertexShader: floorButtonVertexShader,
        fragmentShader: floorButtonFragmentShader,
        transparent: true
    })

    return <>
        <mesh key={mesh_obj.uuid}
              geometry={mesh_obj.geometry}
              position={mesh_obj.position} 
              rotation={mesh_obj.rotation} 
              scale={mesh_obj.scale}
              material={floorButtonMaterial}
        />
    </>
}