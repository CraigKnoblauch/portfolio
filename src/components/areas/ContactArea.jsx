/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 contact-area.glb 
*/

import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import MatcapManager from 'src/MatcapManager.js'
import GenericArea from 'src/components/areas/GenericArea.jsx'
import FloorButton from 'src/components/FloorButton.jsx'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import TriggerVolume from 'src/components/TriggerVolume.jsx'

export default function ContactArea(props) {
  const { nodes } = useGLTF('./models/contact-area.glb')
  const matcapManager = new MatcapManager()

  const flagTexuture = useTexture('./textures/usa-flag.png')
  flagTexuture.flipY = false

  return <>
    <group {...props} dispose={null}>
      
      {/* Exclude the flag */}
      <GenericArea nodes={nodes} exclusions={[nodes.Plane002,
                                              nodes.linkedin_floor_button,
                                              nodes.linkedin_trigger_volume,
                                              nodes.email_floor_button,
                                              nodes.email_trigger_volume]}/>

      <mesh key={nodes.Plane002.uuid}
            geometry={nodes.Plane002.geometry}
            position={[nodes.Plane002.position.x, nodes.Plane002.position.y, nodes.Plane002.position.z]} 
            rotation={[nodes.Plane002.rotation._x, nodes.Plane002.rotation._y, nodes.Plane002.rotation._z]} 
            scale={[nodes.Plane002.scale.x, nodes.Plane002.scale.y, nodes.Plane002.scale.z]}>

        <meshBasicMaterial map={flagTexuture} />

      </mesh> 

      <FloorButton plane={nodes.linkedin_floor_button} texturePath={"./textures/outbound-link-icon.png"} rotation={Math.PI/4} />
      <TriggerVolume model={nodes.linkedin_trigger_volume} link={"https://www.linkedin.com/in/craig-knoblauch-b88563124/"} />

      <FloorButton plane={nodes.email_floor_button} texturePath={"./textures/send-mail-link-icon.png"} rotation={Math.PI/4} />

      
    </group>
  </>
}

useGLTF.preload('./models/contact-area.glb')
