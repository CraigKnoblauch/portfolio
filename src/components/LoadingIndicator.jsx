import * as Three from 'three'
import { shaderMaterial, useProgress } from "@react-three/drei"
import loadingIndicatorFragmentShader from '../shaders/loading-indicator/fragment.glsl'
import loadingIndicatorVertexShader from '../shaders/loading-indicator/vertex.glsl'
import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'


const LoadingIndicatorMaterial = shaderMaterial(
    {
        uProgress: 0.0,
        uGroundColor: new Three.Color('#b9a46f'),
    },
    loadingIndicatorVertexShader,
    loadingIndicatorFragmentShader
)

extend({ LoadingIndicatorMaterial })

export default function LoadingIndicator(props) {

    const meshRef = useRef()
    const loadingIndicatorMaterialRef = useRef()
    let { progress } = useProgress()

    // eslint-disable-next-line no-unused-vars
    useFrame((state, delta) => {
        loadingIndicatorMaterialRef.current.uProgress = progress/100
    })
    
    return <>
        <mesh ref={meshRef} rotation={props.rotation} position={props.position}>
            <planeGeometry args={props.args} />
            <loadingIndicatorMaterial ref={loadingIndicatorMaterialRef} />
        </mesh>
    </>
}