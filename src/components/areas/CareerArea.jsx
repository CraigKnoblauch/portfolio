import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'

import MatcapManager from 'src/MatcapManager.js'
import GenericArea from "src/components/areas/GenericArea"
import RearwardExhaust from "src/components/RearwardExhaust.jsx"
import RocketFlames from "src/components/RocketFlames.jsx"
import Caption from "src/components/Caption.jsx"
import { RigidBody } from "@react-three/rapier"

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

    const launchButtonRef = useRef()
    const launchButtonZTarget = nodes.launch_button.position.z - 0.09
    const launchState = {
        initLaunch: false,
        hasLaunched: false
    }
    const exhaustIsVisibleRef = useRef(false)

    /**
     * [x] Move the launch button into the launch button platform so it appears to be pressed
     * [ ] Set hasLauched to true so lauch animation cannot repeat
     * [ ] TODO Move camera to a rocket viewing position, then back to look at the rabbit afterwards
     * [x] Initiate launch animation
     */
    useFrame((state, delta) => {

        // Rocket launch animation if the user has requested it and it hasn't already happened
        if (launchState.initLaunch && !launchState.hasLaunched) {
            
            // Move the launch button into the platform
            if (launchButtonRef.current.position.z > launchButtonZTarget) {
                launchButtonRef.current.position.z -= 0.005
            }

            // Show the exhaust fumes
            exhaustIsVisibleRef.current = true

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
        }
        // TODO Under what conditions can I say the launch has completed?

    });
    
    return <>

        <group ref={groupRef} {...props} dispose={null}>

            {/* TODO Take the fence segment out of the exclusions list */}
            <GenericArea nodes={nodes} exclusions={[nodes.fence_segment001, 
                                                    nodes.exhaust_emitter, nodes.rocket, nodes.rocket_nozzle_1, nodes.rocket_nozzle_2, nodes.rocket_cradle,
                                                    nodes.launch_button]}
            />

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

            <RearwardExhaust emitter={nodes.exhaust_emitter} isVisibleRef={exhaustIsVisibleRef} />
            {/* <RocketFlames nozzleRefs={[nozzle1Ref, nozzle2Ref]} /> */}

            {/* Launch button */}
            <RigidBody type="fixed" onCollisionEnter={() => { launchState.initLaunch = true }}>
                <mesh ref={launchButtonRef}
                      geometry={nodes.launch_button.geometry} 
                      position={nodes.launch_button.position} 
                      rotation={nodes.launch_button.rotation} 
                      scale={nodes.launch_button.scale}
                      onClick={() => {launchState.initLaunch = true}}> {/* Include this click for debugging only */}

                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('vanguard-red')} />
                    
                </mesh>
            </RigidBody>
            
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