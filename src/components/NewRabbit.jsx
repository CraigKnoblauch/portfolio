import { useGLTF } from "@react-three/drei"
import { RigidBody, CuboidCollider } from "@react-three/rapier"
import { useRef } from "react"

export default function NewRabbit() {

    const model = useGLTF('./models/rabbit.glb')
    const body = useRef()

    return <>
        <RigidBody type="dynamic" 
                   ref={ body }
                   colliders={false} 
                   gravityScale={0} // Here for debugging purposes only
        >
            <CuboidCollider args={[0.13777, 0.28, 0.325]} position={[0, 0.285, 0]} />
            <primitive object={model.scene} position={[0, 0, 0]} scale={0.25}/>
        </RigidBody>
    </>
}

useGLTF.preload('./models/rabbit.glb')