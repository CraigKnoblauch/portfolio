import * as Three from 'three'
import { shaderMaterial } from "@react-three/drei"
import floorFragmentShader from '../shaders/floor/fragment.glsl'
import floorVertexShader from '../shaders/floor/vertex.glsl'

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

const FloorMaterial = shaderMaterial(
    {
        tBackground: {value: BackgroundTexture}
    },
    floorVertexShader,
    floorFragmentShader
)


export default function Floor() {
    return <>
        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 } frustumCulled={ false } matrixAutoUpdate={ true }>
            <planeGeometry />
            <FloorMaterial />
        </mesh>
    </>
}