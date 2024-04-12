import { Sparkles, Center, useGLTF, OrbitControls, useTexture, shaderMaterial } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import * as Three from 'three'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { timerDelta } from 'three/examples/jsm/nodes/Nodes.js'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new Three.Color('#ffffff'),
        uColorEnd: new Three.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)


extend({ PortalMaterial })

export default function Experience()
{
    const { nodes } = useGLTF('./model/portal.glb')
    console.log(nodes)
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterialRef = useRef()

    useFrame((state, delta) => {
        portalMaterialRef.current.uTime += delta
    })

    return <>

        <color args={['#030302']} attach="background" />

        <OrbitControls makeDefault />

        <Center>
            {/* Add baked texture to portal model */}
            <mesh geometry={ nodes.baked.geometry }>
                <meshBasicMaterial map={ bakedTexture } />
            </mesh>

            {/* Load lamp posts */}
            <mesh geometry={ nodes.poleLightA.geometry } position={ nodes.poleLightA.position} >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>
            <mesh geometry={ nodes.poleLightB.geometry } position={ nodes.poleLightB.position}>
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            {/* Portal */}
            <mesh geometry={ nodes.portalLight.geometry } position={ nodes.portalLight.position} rotation={ nodes.portalLight.rotation}>
                <portalMaterial ref={ portalMaterialRef }/>
            </mesh>

            <Sparkles 
                size={6}
                scale={ [4, 2, 4] }
                position-y={ 1 }
                speed={ 0.4 }
                count={ 40 }
            />
        </Center>

    </>
}