import { isMobile } from "react-device-detect"
import { RigidBody, CuboidCollider } from "@react-three/rapier"
import { v4 as uuidv4 } from 'uuid'
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { useTexture, Float } from "@react-three/drei"

export default function TriggerVolume({model, link}) {

    /**
     * Indicator material.
     * Defaults to desktop icon. If mobile, use mobile icon
     */
    let interactionIconTexture = useTexture('./textures/enter-icon.png')
    if (isMobile) {
        interactionIconTexture = useTexture('./textures/enter-touch-icon.png')
    }

    const interactionIconRef = useRef()

    /**
     * Create the interaction icon at the same position as the model
     */
    const interactionIcon = (
        <Float floatIntensity={ 0.25 } rotationIntensity={ 0 }>

            <mesh ref={interactionIconRef}
                position={[model.position.x, model.position.y + 1, model.position.z]}
                visible={false} // Initially invisible
                onClick={() => window.open(link, '_blank')}
            >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial alphaMap={ interactionIconTexture } transparent={true} color="white" />
            </mesh>

        </Float>
    )

    function showInteractionIcon() {
        interactionIconRef.current.visible = true
    }

    function hideInteractionIcon() {
        interactionIconRef.current.visible = false
    }

    useFrame((state, delta) => {
        /**
         * Rotate the interaction icon to face the camera
         * Only do this when the icon is visible
         */
        if (interactionIconRef.current.visible) {
            const camera = state.camera
            const interactionIcon = interactionIconRef.current

            if (camera && interactionIcon) {
                const vector = new THREE.Vector3()
                vector.setFromMatrixPosition(camera.matrixWorld)
                interactionIcon.lookAt(vector)
            }
        }
    })

    return (
        <>
            <group>
                <RigidBody type="fixed"
                           onIntersectionEnter={() => {showInteractionIcon()}}
                           onIntersectionExit={() => {hideInteractionIcon()}}
                           sensor={true}
                >
                    
                    <mesh geometry={model.geometry}
                          position={model.position}
                          rotation={model.rotation}
                          scale={model.scale}
                          visible={true}
                          onClick={() => window.open(link, '_blank')}
                    >
                        <meshBasicMaterial color="red" wireframe />
                    </mesh>
                </RigidBody>

                {interactionIcon}

            </group>
        </>
    );
}