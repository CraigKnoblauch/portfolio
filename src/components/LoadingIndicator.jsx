import * as Three from 'three'
import { PivotControls, shaderMaterial } from "@react-three/drei"
import floorFragmentShader from '../shaders/loading-indicator/fragment.glsl'
import floorVertexShader from '../shaders/loading-indicator/vertex.glsl'
import { useMemo, useRef } from 'react'

export default function LoadingIndicator() {

    const meshRef = useRef()

    const uniforms = useMemo(
        () => ({
          u_time: {
            value: 0.0,
          }
        }), []
    )
    
    return <>
        <mesh ref={meshRef} rotation={[-89.5, 0, 0]}>
            <planeGeometry args={[5, 5, 10, 10]} />
            <shaderMaterial 
                uniforms={uniforms}
                fragmentShader={floorFragmentShader}
                vertexShader={floorVertexShader}
            />
        </mesh>
    </>
}