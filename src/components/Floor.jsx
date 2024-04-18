import * as Three from 'three'
import { PivotControls, shaderMaterial } from "@react-three/drei"
import floorFragmentShader from '../shaders/floor/fragment.glsl'
import floorVertexShader from '../shaders/floor/vertex.glsl'
import { extend } from '@react-three/fiber'
import { useRef, useMemo } from 'react'

const topLeft = new Three.Color("#FFDEA8")
const topRight = new Three.Color("#CCC19D")
const bottomLeft = new Three.Color("#FFDEA8")
const bottomRight = new Three.Color("#DCD3B7")

const FloorTextureData = new Uint8Array([
    Math.round(bottomLeft.r * 255), Math.round(bottomLeft.g * 255), Math.round(bottomLeft.b * 255),
    Math.round(bottomRight.r * 255), Math.round(bottomRight.g * 255), Math.round(bottomRight.b * 255),
    Math.round(topLeft.r * 255), Math.round(topLeft.g * 255), Math.round(topLeft.b * 255),
    Math.round(topRight.r * 255), Math.round(topRight.g * 255), Math.round(topRight.b * 255)
])

const BackgroundTexture = new Three.DataTexture(FloorTextureData, 2, 2, Three.RGBFormat)
BackgroundTexture.magFilter = Three.LinearFilter
BackgroundTexture.needsUpdate = true

export default function Floor() {

    const floorMeshRef = useRef()
    const floorUniforms = useMemo(() => (
        {
            tBackground: {
                value: BackgroundTexture
            }
        }
    ), [])

    return <>
        <PivotControls>
            <mesh ref={floorMeshRef} geometry={ new Three.PlaneGeometry(1, 1, 100, 100)} rotation-x={ - Math.PI * 0.5 } frustumCulled={ false } matrixAutoUpdate={ true }>
                <shaderMaterial 
                    uniforms={floorUniforms}
                    fragmentShader={floorFragmentShader}
                    vertexShader={floorVertexShader}
                />
            </mesh>
        </PivotControls>
    </>
}