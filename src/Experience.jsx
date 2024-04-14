import { Sparkles, Center, useGLTF, OrbitControls, useTexture, shaderMaterial } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import * as Three from 'three'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import { timerDelta } from 'three/examples/jsm/nodes/Nodes.js'
import Rabbit from './Rabbit'

export default function Experience()
{
    // const { nodes } = useGLTF('./model/portal.glb')
    // console.log(nodes)
    // const bakedTexture = useTexture('./model/baked.jpg')
    // bakedTexture.flipY = false

    // const portalMaterialRef = useRef()

    // const rabbit = useGLTF('./model/rabbit.glb')

    // useFrame((state, delta) => {
    //     portalMaterialRef.current.uTime += delta
    // })

    return <>

        {/* <color args={['#FFDEA8']} attach="background" /> */}

        <OrbitControls makeDefault />

        <ambientLight />

        <group position={[0, -1, 0]}>
            <Rabbit />
        </group>

    </>
}