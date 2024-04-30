import { RigidBody } from "@react-three/rapier"

export default function MovementDebugPlane() {
    return <>
        <RigidBody type="fixed"
                   friction={0}
        >
            <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[10, 0.1, 10]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    </>
}