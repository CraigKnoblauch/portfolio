import { RigidBody } from "@react-three/rapier"
import { useGLTF } from "@react-three/drei"
import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Rabbit() {

    const body = useRef()
    const model = useGLTF('./models/rabbit.glb')

    console.log(model)

    return <>
        {/* <RigidBody ref={body} 
                    canSleep={false} 
                    colliders="ball" 
                    restitution={0.2} 
                    friction={1} 
                    linearDamping={0.5} // The damping allows the ball to come to a stop
                    angularDamping={0.5}
                    position={[0, 0, 0]}
         > */}
            <primitive object={model.scene} />
        {/* </RigidBody> */}
    </>
}