import * as Three from 'three'
import { PivotControls } from "@react-three/drei"
import { useRef, useMemo } from 'react'

import floorFragmentShader from '../shaders/floor/fragment.glsl'
import floorVertexShader from '../shaders/floor/vertex.glsl'


// Temporary to figure out texture
// const BackgroundTexture = new Three.TextureLoader().load('../textures/sky.jpg')
// BackgroundTexture.wrapS = Three.RepeatWrapping
// BackgroundTexture.wrapT = Three.RepeatWrapping
// BackgroundTexture.repeat.set(4,4)

/**
 * Check these resources to better understand and diagnose this issue
 * https://blog.maximeheckel.com/posts/the-study-of-shaders-with-react-three-fiber/
 * https://discourse.threejs.org/t/using-datatextures-in-shader-materials/23171
 */

export default function Floor() {

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
            <mesh ref={floorMeshRef} geometry={ new Three.PlaneGeometry(2, 2, 10, 10)} rotation-x={ - Math.PI * 0.5 } frustumCulled={ false } matrixAutoUpdate={ false }>
                <shaderMaterial 
                    uniforms={floorUniforms}
                    fragmentShader={floorFragmentShader}
                    vertexShader={floorVertexShader}
                />
            </mesh>
        </PivotControls>
    </>
}