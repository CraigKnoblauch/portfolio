import { PivotControls, useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useLoader, useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import MatcapManager from 'src/MatcapManager.js'
import GenericArea from "src/components/areas/GenericArea"

export default function CareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')
    const groupRef = useRef()
    const indicatorRef = useRef()

    const exhaustEmitter = nodes.exhaust_emitter
    const matcapManager = new MatcapManager()

    const smokeMaterials = [
        matcapManager.getMatcapByName('dish-support'),
        matcapManager.getMatcapByName('rock-gray'),
        matcapManager.getMatcapByName('phx-gray'),
    ]

    const maxNumExhaustMeshes = 100
    const exhaustQueue = useRef([])

    // Function to add a new element to the exhaust FIFO queue
    const enqueue = (element) => {
        if (exhaustQueue.current.length === maxNumExhaustMeshes) {
            const oldest = exhaustQueue.current.pop(); // Remove the last element if the queue is full
            groupRef.current.remove(oldest); // Remove the mesh from the scene
        }
        exhaustQueue.current.unshift(element); // Add the new element to the front of the queue
        groupRef.current.add(element); // Add the new mesh to the scene
    };

    useFrame((state, delta) => {

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

        // Add the new element to the exhaust queue
        enqueue(dodecahedron);

        exhaustQueue.current.forEach((element) => {

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

        });

    });
    
    return <>

        <group ref={groupRef} {...props} dispose={null}>

            <GenericArea nodes={nodes} exclusions={[nodes.exhaust_emitter]}/>

        </group>

    </>
}