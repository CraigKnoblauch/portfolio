import { isMobile } from "react-device-detect"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { useTexture, Float, useKeyboardControls } from "@react-three/drei"
import PropTypes from 'prop-types'


export default function TriggerVolume({model, link}) {

    /**
     * Indicator material.
     * Defaults to desktop icon. If mobile, use mobile icon
     */
    let interactionIconTexturePath = './textures/enter-icon.png'
    if (isMobile) {
        interactionIconTexturePath = './textures/enter-touch-icon.png'
    }

    const interactionIconTexture = useTexture(interactionIconTexturePath)
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

    const [subscribeKeys, getKeys] = useKeyboardControls()
    useFrame((state, delta) => {
        /**
         * Actions will only occur if the interaction icon is visible.
         * This is an indication that the rabbit is in the trigger volume
         */
        if (interactionIconRef.current.visible) {

            /**
             * Rotate the interaction icon to face the camera
             */
            const camera = state.camera
            const interactionIcon = interactionIconRef.current

            if (camera && interactionIcon) {
                const vector = new THREE.Vector3()
                vector.setFromMatrixPosition(camera.matrixWorld)
                interactionIcon.lookAt(vector)
            }

            /**
             * If the user is on desktop and has pressed enter, open the link in a new tab
             */
            if (!isMobile) {
                if (getKeys().enter) {
                    window.open(link, '_blank')
                }
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
                          onClick={() => window.open(link, '_blank')}
                          material={new THREE.MeshBasicMaterial({visible: false})}
                    />
                </RigidBody>

                {interactionIcon}

            </group>
        </>
    );
}
TriggerVolume.propTypes = {
    model: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired
}