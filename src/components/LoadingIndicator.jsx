import * as Three from 'three'
import { shaderMaterial } from "@react-three/drei"
import loadingIndicatorFragmentShader from '../shaders/loading-indicator/fragment.glsl'
import loadingIndicatorVertexShader from '../shaders/loading-indicator/vertex.glsl'
import { useMemo, useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'

const LoadingIndicatorMaterial = shaderMaterial(
    {
        uProgress: 1.0
    },
    loadingIndicatorVertexShader,
    loadingIndicatorFragmentShader
)

extend({ LoadingIndicatorMaterial })

export default function LoadingIndicator() {

    const meshRef = useRef()
    const loadingIndicatorMaterialRef = useRef()

    useFrame((state, delta) => {
        // Increment the progress of the loading indicator by 0.01 every frame
        loadingIndicatorMaterialRef.current.uProgress += 0.01

        // When the progress reaches 1, it will be reset to 0
        if (loadingIndicatorMaterialRef.current.uProgress >= 1.0) {
            loadingIndicatorMaterialRef.current.uProgress = 0
        }
    })
    
    return <>
        <mesh ref={meshRef} rotation={[-89.5, 0, 0]}>
            <planeGeometry args={[6, 6, 10, 10]} />
            <loadingIndicatorMaterial ref={loadingIndicatorMaterialRef} />
        </mesh>
    </>
}