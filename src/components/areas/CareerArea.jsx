import { useGLTF, useTexture, shaderMaterial, Float, Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import * as THREE from 'three'
import { extend } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"

import MatcapManager from 'src/MatcapManager.js'
import GenericArea from "src/components/areas/GenericArea"
import RearwardExhaust from "src/components/RearwardExhaust.jsx"
import Caption from "src/components/Caption.jsx"
import CameraZone from "src/components/CameraZone.jsx"

import yellowFlamesVertexShader from 'src/shaders/rocket-flames/yellow/vertex.glsl'
import yellowFlamesFragmentShader from 'src/shaders/rocket-flames/yellow/fragment.glsl'


// new THREE.Vector3(0xfa, 0xf6, 0xd2)
/**
 * Color options
 * 1. hot white and cool yellow
 *      uHotFlameColor: new THREE.Color('#faf6d2'),
 *      uCoolFlameColor: new THREE.Color('#fad482')
 */
const YellowFlamesMaterial = shaderMaterial(
    {
        uTime: 0,
        uPerlinTexture: new THREE.Uniform(null),
        uJumpyPerlinTexture: new THREE.Uniform(null),
        uJumpyPerlinTextureVertical: 0,
        uHotFlameColor: new THREE.Color('#fabd07'),
        uCoolFlameColor: new THREE.Color('#077cfa')
    },
    yellowFlamesVertexShader,
    yellowFlamesFragmentShader
)

extend({ YellowFlamesMaterial })

export default function CareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')
    const groupRef = useRef()

    const groundTexture = useTexture('./textures/career-area-baked-with-text.jpg')
    groundTexture.flipY = false

    const rocketTexture = useTexture('./textures/rocket-uv-map.jpg')
    rocketTexture.flipY = false
    rocketTexture.extend = true

    const rocketGroupRef = useRef()
    const cradleRef = useRef(nodes.rocket_cradle)

    const nozzle1Ref = useRef(nodes.rocket_nozzle_1)
    const nozzle2Ref = useRef(nodes.rocket_nozzle_2)

    const matcapManager = new MatcapManager()

    let initialRocketSpeed = 0.01;
    const rocketAcceleration = 0.001;

    // Flames perlin texture
    const perlinTexture = useTexture('./textures/perlin.png')
    perlinTexture.wrapS = THREE.RepeatWrapping
    perlinTexture.wrapT = THREE.RepeatWrapping

    // Texture to use for flame jumpiness
    const jumpyPerlinTexture = useTexture('./textures/jumpy-perlin.png')
    jumpyPerlinTexture.wrapS = THREE.RepeatWrapping
    jumpyPerlinTexture.wrapT = THREE.RepeatWrapping

    // Cradle should fall to 90 degrees away from where it started
    // So that it looks like it's fallen to the platform
    const cradleRotationLimit = cradleRef.current.rotation.z - Math.PI/2
    let cradleRotationalVelocity = 0.01

    const launchButtonRef = useRef()
    const launchButtonZTarget = nodes.launch_button.position.z - 0.09
    const launchState = {
        initLaunch: false,
        isTimeToFly: false, // There will be a small delay before the rocket actually flys up, but the exhaust needs to be going in that time.
        hasLaunched: false
    }
    const exhaustRef = useRef({
        isVisible: false,
        terminate: false
    })

    // Animate flames
    const yellowFlamesMaterialRef1 = useRef()
    const yellowFlamesMaterialRef2 = useRef()

    function startLaunch() {
        launchState.initLaunch = true
        window.setTimeout(() => {
            launchState.isTimeToFly = true
        }, 500)
    }

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
            exhaustRef.current.isVisible = true

            // If it's time to fly, run the rocket launch animation
            if (launchState.isTimeToFly) {
                // ****************************************************
                // Rocket Launch Animation
                // ****************************************************
                // Move the rocket upwards, slowly at first and then gaining speed
                // if (rocketGroupRef.current.position.y < 5) { // TODO remove this: Stop the rocket for debugging purposes
                    rocketGroupRef.current.position.y += initialRocketSpeed;
                    initialRocketSpeed += rocketAcceleration;
                // }

                // Rotate the cradle until it falls to a set position
                if (cradleRef.current.rotation.z > cradleRotationLimit) {
                    // cradleRef.current.rotation.z -= 0.01
                    cradleRef.current.rotation.z -= cradleRotationalVelocity * 0.01;
                    cradleRotationalVelocity += 0.05;
                }

                // end rocket launch animation
                // ****************************************************
            }

            // When the rocket reaches a certain position, stop the launch animation
            // TODO this is a hacky, impatient solution. Refactor to be based on the camera view
            if (rocketGroupRef.current.position.y >= 20) {
                launchState.hasLaunched = true

                // Stop the exhaust fumes
                exhaustRef.current.terminate = true
            }
        }
        // TODO Under what conditions can I say the launch has completed?

        // TEMP Working on yellow flames animation
        yellowFlamesMaterialRef1.current.uTime += delta
        yellowFlamesMaterialRef2.current.uTime += delta

    });
    
    return <>

        <group ref={groupRef} {...props} dispose={null}>

            {/* TODO Take the fence segment out of the exclusions list */}
            <GenericArea nodes={nodes} exclusions={[nodes.career_ground, 
                                                    nodes.asu_camera_zone, nodes.asu_camera,
                                                    nodes.nrl_camera_zone, nodes.nrl_camera,
                                                    nodes.exhaust_emitter, nodes.rocket, nodes.rocket_nozzle_1, nodes.rocket_nozzle_2, nodes.rocket_cradle,
                                                    nodes.rocket_yellow_flames_1, nodes.rocket_yellow_flames_2,
                                                    nodes.launch_button]}
            />

            {/* Floor with baked material */}
            <RigidBody type="fixed">
                <mesh key={nodes.career_ground.uuid}
                      geometry={nodes.career_ground.geometry} 
                      position={nodes.career_ground.position} 
                      rotation={nodes.career_ground.rotation} 
                      scale={nodes.career_ground.scale}>

                    <meshBasicMaterial map={groundTexture} />

                </mesh>
            </RigidBody>

            {/* Camera zones */}
            <CameraZone cameraZoneBase={nodes.asu_camera_zone} camera={nodes.asu_camera} />
            <CameraZone cameraZoneBase={nodes.nrl_camera_zone} camera={nodes.nrl_camera} />
            <CameraZone cameraZoneBase={nodes.vanguard_camera_zone} camera={nodes.vanguard_camera} />

            <group ref={rocketGroupRef}>

                <mesh geometry={nodes.rocket.geometry} position={nodes.rocket.position}>
                    <meshBasicMaterial map={rocketTexture} />
                </mesh>

                {/* Todo, the nozzle position isn't changing with the rocket position even though the mesh is moving on the screen */}
                <mesh geometry={nodes.rocket_nozzle_1.geometry} ref={nozzle1Ref} position={nodes.rocket_nozzle_1.position} rotation={nodes.rocket_nozzle_1.rotation} scale={nodes.rocket_nozzle_1.scale}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('silver')} />
                </mesh>

                <mesh geometry={nodes.rocket_nozzle_2.geometry} ref={nozzle2Ref} position={nodes.rocket_nozzle_2.position} rotation={nodes.rocket_nozzle_2.rotation} scale={nodes.rocket_nozzle_2.scale}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('silver')} />
                </mesh>

                <mesh geometry={nodes.rocket_yellow_flames_1.geometry} position={nodes.rocket_yellow_flames_1.position} rotation={nodes.rocket_yellow_flames_1.rotation} scale={nodes.rocket_yellow_flames_1.scale}>
                    <yellowFlamesMaterial ref={yellowFlamesMaterialRef1} 
                                          uPerlinTexture={perlinTexture} 
                                          uJumpyPerlinTexture={jumpyPerlinTexture}
                                          uJumpyPerlinTextureVertical={0.5}
                                          transparent 
                    />
                </mesh>

                <mesh geometry={nodes.rocket_yellow_flames_2.geometry} position={nodes.rocket_yellow_flames_2.position} rotation={nodes.rocket_yellow_flames_2.rotation} scale={nodes.rocket_yellow_flames_2.scale}>
                    <yellowFlamesMaterial ref={yellowFlamesMaterialRef2} 
                                          uPerlinTexture={perlinTexture} 
                                          uJumpyPerlinTexture={jumpyPerlinTexture}
                                          uJumpyPerlinTextureVertical={0.25}
                                          transparent 
                    />
                </mesh>

            </group>

            <mesh geometry={nodes.rocket_cradle.geometry} ref={cradleRef} position={nodes.rocket_cradle.position} rotation={nodes.rocket_cradle.rotation} scale={nodes.rocket_cradle.scale}>
                <meshMatcapMaterial matcap={matcapManager.getMatcapByName('rock-gray')} />
            </mesh>

            <RearwardExhaust emitter={nodes.exhaust_emitter} exhaustRef={exhaustRef} />
            {/* <RocketFlames nozzleRefs={[nozzle1Ref, nozzle2Ref]} /> */}

            {/* Launch button */}
            <RigidBody type="fixed" onCollisionEnter={startLaunch}>
                <mesh ref={launchButtonRef}
                      geometry={nodes.launch_button.geometry} 
                      position={nodes.launch_button.position} 
                      rotation={nodes.launch_button.rotation} 
                      scale={nodes.launch_button.scale}
                      onClick={startLaunch}> {/* Include this click for debugging only */}

                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('vanguard-red')} />
                    
                </mesh>
            </RigidBody>

            {/* 
                Launch button caption, floating text because I can't figure out the z fighting right now
            */}
            <Float floatIntensity={ 0.3 } rotationIntensity={ 0 }>
                <Text
                    font="./fonts/bebas-neue-v9-latin-regular.woff"
                    scale={ 0.5 }
                    maxWidth={ 5 }
                    lineHeight={ 0.75 }
                    textAlign="center"
                    position={ [3.45, 1.25, -26.1] }
                    rotation-y={ 0 }
                    color="red"
                    >
                    LAUNCH
                    <meshBasicMaterial toneMapped={ false } />
                </Text>
            </Float>
            
            {/* Captions */}
            {/* TODO Make these postions dependent on something in the scene */}
            <Caption path={"./textures/asu-caption.png"}           x={-9.2}    z={-14.1} rotation={77.7 * (Math.PI/180)}                   />
            <Caption path={"./textures/phoenix-caption.png"}       x={-6}      z={-24.3} rotation={41.8 * (Math.PI/180)}                   />
            <Caption path={"./textures/launch-caption.png"}        x={1.6}     z={-25.6}                                                   />
            {/* <Caption path={"./textures/launch-button-caption.png"} x={3.72}    z={-26.1}                                   textColor="red" /> */}
            <Caption path={"./textures/vanguard-caption.png"}      x={9}       z={-23.4} rotation={-44.8 * (Math.PI/180)}                  />
            <Caption path={"./textures/nrl-caption.png"}           x={11.4}    z={-14.1} rotation={-74.5 * (Math.PI/180)}                  />
            

        </group>

    </>
}