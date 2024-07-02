import { shaderMaterial, useTexture } from "@react-three/drei"
import { useRef } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from "@react-three/fiber"

import fragmentShader from 'src/shaders/fog-wall/fragment.glsl'
import vertexShader from 'src/shaders/fog-wall/vertex.glsl'

const FogWallMaterial = shaderMaterial(
    {
        uTime: 0,
        uPerlinTexture: new THREE.Uniform(null)
    },
    vertexShader,
    fragmentShader
)

extend({ FogWallMaterial })

export default function FogWall( { wallMesh } ) {

    const perlinTexture = useTexture('./textures/turbulence-perlin.png')
    perlinTexture.wrapS = THREE.RepeatWrapping
    perlinTexture.wrapT = THREE.RepeatWrapping

    // Animate wall
    const fogWallMaterialRef = useRef()
    useFrame((state, delta) => {
        fogWallMaterialRef.current.uTime += delta
    })
    
    return <>
        <mesh geometry={wallMesh.geometry} position={wallMesh.position} rotation={wallMesh.rotation} scale={wallMesh.scale} >
            <fogWallMaterial ref={fogWallMaterialRef} uPerlinTexture={perlinTexture} transparent />
        </mesh>
    </>
}