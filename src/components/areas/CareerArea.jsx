import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useLoader, useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import MatcapManager from 'src/MatcapManager.js'
import GenericArea from "src/components/areas/GenericArea"

export default function CareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')
    const matcapManager = new MatcapManager()
    const groupRef = useRef()

    const exhaustEmitter = nodes.exhaust_emitter

    const maxNumExhaustMeshes = 10
    const exhaustQueue = useRef([])

    // Function to add a new element to the exhaust queue
    const enqueue = (element) => {
        if (exhaustQueue.current.length === maxNumExhaustMeshes) {
            const oldest = exhaustQueue.current.pop(); // Remove the last element if the queue is full
            groupRef.current.remove(oldest); // Remove the mesh from the scene
        }
        exhaustQueue.current.unshift(element); // Add the new element to the front of the queue
        groupRef.current.add(element); // Add the new mesh to the scene
    };

    useFrame(() => {
        const dodecahedron = new THREE.Mesh(
            new THREE.DodecahedronGeometry(1),
            new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff })
        );
        dodecahedron.position.set(exhaustEmitter.position.x, exhaustEmitter.position.y, exhaustEmitter.position.z);
        
        enqueue(dodecahedron);
    });
    
    return <>

        <group ref={groupRef} {...props} dispose={null}>

            <GenericArea nodes={nodes} exclusions={[nodes.exhaust_emitter]}/>

        </group>

    </>
}