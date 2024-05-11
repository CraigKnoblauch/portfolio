import { PivotControls, useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useLoader, useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import MatcapManager from 'src/MatcapManager.js'
import FifoQueue from 'src/FifoQueue.js'
import GenericArea from "src/components/areas/GenericArea"
import RearwardExhaust from "src/components/RearwardExhaust.jsx"

export default function CareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')
    console.log(nodes)
    const groupRef = useRef()
    const rocketGroupRef = useRef()
    const cradleRef = useRef(nodes.rocket_cradle)

    const matcapManager = new MatcapManager()

    let initialRocketSpeed = 0.01;
    const rocketAcceleration = 0.001;

    // Cradle should fall to 90 degrees away from where it started
    // So that it looks like it's fallen to the platform
    const cradleRotationLimit = cradleRef.current.rotation.z - Math.PI/2
    let cradleRotationalVelocity = 0.01

    useFrame((state, delta) => {
        // temporary for debugging
        state.camera.lookAt(nodes.rocket.position)

        // ****************************************************
        // Rocket Launch Animation
        // ****************************************************
        // Move the rocket upwards, slowly at first and then gaining speed
        rocketGroupRef.current.position.y += initialRocketSpeed;
        initialRocketSpeed += rocketAcceleration;

        // Rotate the cradle until it falls to a set position
        if (cradleRef.current.rotation.z > cradleRotationLimit) {
            // cradleRef.current.rotation.z -= 0.01
            cradleRef.current.rotation.z -= cradleRotationalVelocity * 0.1;
            cradleRotationalVelocity += 0.05;
        }

        // end rocket launch animation
        // ****************************************************

    });
    
    return <>

        <group ref={groupRef} {...props} dispose={null}>

            <GenericArea nodes={nodes} exclusions={[nodes.fence_segment001, nodes.exhaust_emitter, nodes.rocket, nodes.rocket_nozzle_1, nodes.rocket_nozzle_2, nodes.rocket_cradle, nodes.rocket_platform]}/>

            <group ref={rocketGroupRef}>

                <mesh geometry={nodes.rocket.geometry}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('bright-white')} />
                </mesh>

                {/* Todo, the nozzle position isn't changing with the rocket position even though the mesh is moving on the screen */}
                <mesh geometry={nodes.rocket_nozzle_1.geometry} position={nodes.rocket_nozzle_1.position} rotation={nodes.rocket_nozzle_1.rotation} scale={nodes.rocket_nozzle_1.scale}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('silver')} />
                </mesh>

                <mesh geometry={nodes.rocket_nozzle_2.geometry} position={nodes.rocket_nozzle_2.position} rotation={nodes.rocket_nozzle_2.rotation} scale={nodes.rocket_nozzle_2.scale}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('silver')} />
                </mesh>

            </group>

            <mesh geometry={nodes.rocket_cradle.geometry} ref={cradleRef} position={nodes.rocket_cradle.position} rotation={nodes.rocket_cradle.rotation} scale={nodes.rocket_cradle.scale}>
                <meshMatcapMaterial matcap={matcapManager.getMatcapByName('rock-gray')} />
            </mesh>

            <RearwardExhaust emitter={useRef(nodes.exhaust_emitter)} />

        </group>

    </>
}