import { useGLTF, useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"


export default function Ground() {

    const { nodes } = useGLTF('./models/ground.glb')
    const texture = useTexture('./models/ground-baked.jpg')
    texture.flipY = false

    return <>
        <RigidBody type="fixed"
                   friction={0.5}
        >
            <mesh geometry={ nodes.rabbit_hole_ground.geometry } position={[0, 0, 0]} scale={1}>
                <meshBasicMaterial map={ texture } />
            </mesh>
        </RigidBody>
    </>
}