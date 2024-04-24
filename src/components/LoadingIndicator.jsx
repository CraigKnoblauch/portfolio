import * as Three from 'three'
import { shaderMaterial } from "@react-three/drei"
import floorFragmentShader from '../shaders/loading-indicator/fragment.glsl'
import floorVertexShader from '../shaders/loading-indicator/vertex.glsl'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function LoadingIndicator() {

    const meshRef = useRef()
    const shaderMaterialRef = useRef()

    const uniforms = useMemo(
        () => ({
          uProgress: {
            value: 1.0,
          }
        }), []
    )

    useFrame((state, delta) => {
        // Increment the progress of the loading indicator by 0.01 every frame
        shaderMaterialRef.current.uProgress.value += 0.01

        // When the progress reaches 1, it will be reset to 0
        if (shaderMaterialRef.current.uProgress.value >= 1.0) {
            shaderMaterialRef.current.uProgress.value = 0
        }

        console.log(shaderMaterialRef.current.uProgress.value)
    })
    
    return <>
        <mesh ref={meshRef} rotation={[-89.5, 0, 0]}>
            <planeGeometry args={[6, 6, 10, 10]} />
            <shaderMaterial 
                uniforms={uniforms}
                fragmentShader={floorFragmentShader}
                vertexShader={floorVertexShader}
                transparent = { true }
                ref={shaderMaterialRef}
            />
        </mesh>
    </>
}