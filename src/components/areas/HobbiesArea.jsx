/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 hobbies-area.glb 
*/

import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { isMobile } from 'react-device-detect'
import MatcapManager from 'src/MatcapManager.js'
import GenericArea from 'src/components/areas/GenericArea.jsx'
import Caption from 'src/components/Caption.jsx'
import FloorButton from 'src/components/FloorButton.jsx'
import TriggerVolume from 'src/components/TriggerVolume.jsx'

export default function HobbiesArea(props) {
  const { nodes } = useGLTF('./models/hobbies-area.glb')
  const matcapManager = new MatcapManager()

  // Easier to make two objects than to rotate the sign
  const frontSignTexture = useTexture('./textures/construction-sign.png')
  const backSignTexture = useTexture('./textures/construction-sign.png')
  backSignTexture.flipY = false

  return <>
    <group {...props} dispose={null}>
      
      <GenericArea nodes={nodes} exclusions={[
        nodes.construction_sign_front_facing, 
        nodes.construction_sign_rear_facing, 
        nodes.github_floor_button,
        nodes.github_trigger_volume
      ]}/>

      <mesh geometry={nodes.construction_sign_front_facing.geometry} 
            position={nodes.construction_sign_front_facing.position} 
            rotation={nodes.construction_sign_front_facing.rotation} 
            scale={nodes.construction_sign_front_facing.scale}>

        <meshBasicMaterial map={frontSignTexture} />

      </mesh>

      <mesh geometry={nodes.construction_sign_rear_facing.geometry} 
            position={nodes.construction_sign_rear_facing.position} 
            rotation={nodes.construction_sign_rear_facing.rotation} 
            scale={nodes.construction_sign_rear_facing.scale}>
              
        <meshBasicMaterial map={backSignTexture} />

      </mesh>

      {/* Show controls on desktop only */}
      {!isMobile && <Caption path="./textures/keyboard-controls-icon.png" x={1.5} z={1.2} length={2} width={1.5} /> }

      <FloorButton plane={nodes.github_floor_button} texturePath={"./textures/outbound-link-icon.png"} />
      <TriggerVolume model={nodes.github_trigger_volume} link={"https://github.com/CraigKnoblauch"} />
      
    </group>
  </>
}

useGLTF.preload('./models/hobbies-area.glb')
