import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'

import MatcapManager from 'src/MatcapManager.js'
import GenericArea from "src/components/areas/GenericArea"
import RearwardExhaust from "src/components/RearwardExhaust.jsx"
import RocketFlames from "src/components/RocketFlames.jsx"
import Caption from "src/components/Caption.jsx"

export default function CareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')
    const groupRef = useRef()
    const rocketGroupRef = useRef()
    const cradleRef = useRef(nodes.rocket_cradle)

    const nozzle1Ref = useRef(nodes.rocket_nozzle_1)
    const nozzle2Ref = useRef(nodes.rocket_nozzle_2)

    const matcapManager = new MatcapManager()

    let initialRocketSpeed = 0.01;
    const rocketAcceleration = 0.001;

    // Cradle should fall to 90 degrees away from where it started
    // So that it looks like it's fallen to the platform
    const cradleRotationLimit = cradleRef.current.rotation.z - Math.PI/2
    let cradleRotationalVelocity = 0.01

    useFrame((state, delta) => {
        // temporary for debugging
        // state.camera.lookAt(nodes.rocket.position)

        // ****************************************************
        // Rocket Launch Animation
        // ****************************************************
        // Move the rocket upwards, slowly at first and then gaining speed
        if (rocketGroupRef.current.position.y < 5) { // TODO remove this: Stop the rocket for debugging purposes
            rocketGroupRef.current.position.y += initialRocketSpeed;
            initialRocketSpeed += rocketAcceleration;
        }

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

            {/* TODO Take the fence segment out of the exclusions list */}
            <GenericArea nodes={nodes} exclusions={[nodes.fence_segment001, nodes.exhaust_emitter, nodes.rocket, nodes.rocket_nozzle_1, nodes.rocket_nozzle_2, nodes.rocket_cradle]}/>

            <group ref={rocketGroupRef}>

                <mesh geometry={nodes.rocket.geometry}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('bright-white')} />
                </mesh>

                {/* Todo, the nozzle position isn't changing with the rocket position even though the mesh is moving on the screen */}
                <mesh geometry={nodes.rocket_nozzle_1.geometry} ref={nozzle1Ref} position={nodes.rocket_nozzle_1.position} rotation={nodes.rocket_nozzle_1.rotation} scale={nodes.rocket_nozzle_1.scale}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('silver')} />
                </mesh>

                <mesh geometry={nodes.rocket_nozzle_2.geometry} ref={nozzle2Ref} position={nodes.rocket_nozzle_2.position} rotation={nodes.rocket_nozzle_2.rotation} scale={nodes.rocket_nozzle_2.scale}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('silver')} />
                </mesh>

            </group>

            <mesh geometry={nodes.rocket_cradle.geometry} ref={cradleRef} position={nodes.rocket_cradle.position} rotation={nodes.rocket_cradle.rotation} scale={nodes.rocket_cradle.scale}>
                <meshMatcapMaterial matcap={matcapManager.getMatcapByName('rock-gray')} />
            </mesh>

            {/* <RearwardExhaust emitter={nodes.exhaust_emitter} /> */}
            {/* <RocketFlames nozzleRefs={[nozzle1Ref, nozzle2Ref]} /> */}
            
            {/* Captions */}
            {/* TODO Make these postions dependent on something in the scene */}
            <Caption path={"./textures/asu-caption.png"}           x={-9.2}    z={-14.1} rotation={77.7 * (Math.PI/180)}                   />
            <Caption path={"./textures/phoenix-caption.png"}       x={-6}      z={-24.3} rotation={41.8 * (Math.PI/180)}                   />
            <Caption path={"./textures/launch-caption.png"}        x={1.6}     z={-25.6}                                                   />
            <Caption path={"./textures/launch-button-caption.png"} x={3.72}    z={-26.1}                                   textColor="red" />
            <Caption path={"./textures/vanguard-caption.png"}      x={9}       z={-23.4} rotation={-44.8 * (Math.PI/180)}                  />
            <Caption path={"./textures/nrl-caption.png"}           x={11.4}    z={-14.1} rotation={-74.5 * (Math.PI/180)}                  />
            

        </group>

    </>
}