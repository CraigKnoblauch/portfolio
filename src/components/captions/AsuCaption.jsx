import { useTexture } from "@react-three/drei"

export default function AsuCaption({position=[0, 1, 0], rotation_on_ground=0}) {

    const texture = useTexture('./models/asu-caption.png')

    return <>
        <mesh position={position} rotation={[-Math.PI/2, 0, rotation_on_ground]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial alphaMap={ texture } transparent={ true } color="blue"/>
        </mesh>
    </>
}