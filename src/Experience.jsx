import { Sparkles, Center, useGLTF, OrbitControls, useTexture, shaderMaterial } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import * as Three from 'three'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { timerDelta } from 'three/examples/jsm/nodes/Nodes.js'
import Rabbit from './Rabbit'

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

    // const portalMaterialRef = useRef()

    // const rabbit = useGLTF('./model/rabbit.glb')

    // useFrame((state, delta) => {
    //     portalMaterialRef.current.uTime += delta
    // })

    return <>

        <color args={['#FFDEA8']} attach="background" />

        <OrbitControls makeDefault />

        <ambientLight />

        <Center>
            <Rabbit />
        </Center>

    </>
}