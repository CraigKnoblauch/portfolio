/**
 * This function captures the following:
 * 1. Drawing the plane on the ground that shows a border with rounded corners and the appropriate indicator
 * 2. Drawing the enter icon hovering above the floor when the rabbit is in the trigger volume
 * 3. Drawing the floating border when the rabbit is in the trigger volume
 */
import { useTexture } from "@react-three/drei"
import PropTypes from 'prop-types'


// NOTE: Technically all I'm using the plane for is the position
export default function FloorButton({plane, texturePath, rotation=0}) {

    // TODO Respond to a trigger volume event here.
    
    const texture = useTexture(texturePath)

    return <>
        <mesh key={plane.uuid}
              position={[plane.position.x, 0.05, plane.position.z]} 
              rotation={[-Math.PI / 2, 0, rotation]}
              scale={plane.scale}
        >
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial alphaMap={ texture } transparent={ true } color="white" />
        </mesh>
    </>
}
FloorButton.propTypes = {
    plane: PropTypes.object.isRequired,
    texturePath: PropTypes.string.isRequired,
    rotation: PropTypes.number
}