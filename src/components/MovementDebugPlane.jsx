import { RigidBody } from "@react-three/rapier"


export default function MovementDebugPlane() {
    return <>
        <RigidBody type="fixed"
                   friction={0.5}
                   colliders="cuboid"
        >
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[100, 0.1, 100]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    </>
}