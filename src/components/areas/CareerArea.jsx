import { PivotControls, useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useLoader, useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import MatcapManager from 'src/MatcapManager.js'
import FifoQueue from 'src/FifoQueue.js'
import GenericArea from "src/components/areas/GenericArea"

export default function CareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')
    console.log(nodes)
    const groupRef = useRef()
    const rocketGroupRef = useRef()
    const cradleRef = useRef(nodes.rocket_cradle)

    const exhaustEmitter = nodes.exhaust_emitter
    const matcapManager = new MatcapManager()

    const smokeMaterials = [
        matcapManager.getMatcapByName('dish-support'),
        matcapManager.getMatcapByName('rock-gray'),
        matcapManager.getMatcapByName('phx-gray'),
    ]

    let initialRocketSpeed = 0.01;
    const rocketAcceleration = 0.001;

    const maxNumExhaustMeshes = 100
    const backwardExhaustQueue = new FifoQueue(100)
    const downwardExhaustQueue = new FifoQueue(100)

    // Cradle should fall to 90 degrees away from where it started
    // So that it looks like it's fallen to the platform
    const cradleRotationLimit = cradleRef.current.rotation.z - Math.PI/2
    let cradleRotationalVelocity = 0.01

    useFrame((state, delta) => {

        // ****************************************************
        // Backward Exhaust Animation
        // ****************************************************
        const dodecahedron = new THREE.Mesh(
            new THREE.DodecahedronGeometry(1),
            new THREE.MeshMatcapMaterial({ matcap: smokeMaterials[Math.floor(Math.random() * smokeMaterials.length)] })
        );
        dodecahedron.position.copy(exhaustEmitter.position);

        // Initialize the velocity and spin of the exhaust element
        dodecahedron.velocity = new THREE.Vector3(
            1 * Math.sin(exhaustEmitter.rotation.y + 10 + (0.25 * (Math.random()*2-1))), // Last bit adds a random deviation in the x and z directions
            0.1,
            -1 * Math.cos(exhaustEmitter.rotation.y + 1 + (0.25 * (Math.random()*2-1)))
        );
        dodecahedron.spin = new THREE.Vector3(
            Math.random() * 0.1,
            Math.random() * 0.1,
            Math.random() * 0.1
        );

        // Add the new element to the group and the queue
        // If an element was removed from the queue, remove it from the group
        groupRef.current.add(dodecahedron);
        const last = backwardExhaustQueue.enqueue(dodecahedron);
        if (last) {
            groupRef.current.remove(last);
        }

        for (const element of backwardExhaustQueue) {

            // Calculate the distance to the emitter
            const distance = element.position.distanceTo(exhaustEmitter.position);

            // Decrease the velocity as a function of the distance to the emitter
            const distanceScale = Math.random() * (0.1 - 0.001) + 0.001
            const decreaseFactor = Math.max(0, 1 - distance * .005);
            
            element.velocity.multiplyScalar(decreaseFactor);

            // Move the element according to its velocity
            element.position.add(element.velocity);

            // Increase the y position as a function of the distance to the emitter
            const increaseFactor = Math.max(0, distance * 0.0075);
            element.position.y += increaseFactor;

            // Adjust the scale of the element as a function of the distance to the emitter
            const scaleFactor = Math.max(0.6, distance * 0.075);
            element.scale.set(scaleFactor, scaleFactor, scaleFactor);

            // Decrease the spin as a function of the distance to the emitter
            const spinDecreaseFactor = Math.max(0, 1 - distance * 0.001);
            element.spin.multiplyScalar(spinDecreaseFactor);

            // Apply the spin to the element
            element.rotation.x += element.spin.x;
            element.rotation.y += element.spin.y;
            element.rotation.z += element.spin.z;

        };
        // end backward exhaust animation
        // ****************************************************

        // ****************************************************
        // Rocket Launch Animation
        // ****************************************************
        // Move the rocket upwards, slowly at first and then gaining speed
        // rocketGroupRef.current.position.y += initialRocketSpeed;
        // initialRocketSpeed += rocketAcceleration;

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

            <GenericArea nodes={nodes} exclusions={[nodes.exhaust_emitter, nodes.rocket, nodes.rocket_nozzle_1, nodes.rocket_nozzle_2, nodes.rocket_cradle, nodes.rocket_platform]}/>

            <group ref={rocketGroupRef}>

                <mesh geometry={nodes.rocket.geometry}>
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName('bright-white')} />
                </mesh>

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

        </group>

    </>
}