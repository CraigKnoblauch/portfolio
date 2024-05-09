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

    const maxNumExhaustMeshes = 10
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
        
        enqueue(dodecahedron);

        exhaustQueue.current.forEach((element) => {

            exhaustQueue.current.forEach((element) => {
                element.position.x += 0.2 * Math.sin(exhaustEmitter.rotation.y + 10);
                element.position.z -= 0.2 * Math.cos(exhaustEmitter.rotation.y + 1);
            });

        });

    });
    
    return <>

        <group ref={groupRef} {...props} dispose={null}>

            <GenericArea nodes={nodes} exclusions={[nodes.exhaust_emitter]}/>

            {/* Indicators */}
            <mesh geometry={exhaustEmitter.geometry} material={new THREE.MeshBasicMaterial({ color: 'red' })} position={exhaustEmitter.position} rotation={exhaustEmitter.rotation} />
            <mesh ref={indicatorRef} geometry={new THREE.BoxGeometry(0.1, 0.1, 5)} material={new THREE.MeshBasicMaterial({ color: 'red' })} position={exhaustEmitter.position} rotation={exhaustEmitter.rotation} />

        </group>

    </>
}