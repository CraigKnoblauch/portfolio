import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

import MatcapManager from 'src/MatcapManager.js'
import FifoQueue from 'src/FifoQueue.js'

export default function RearwardExhaust(emitterRef) {

    if (!emitterRef) {
        throw new Error("emitterRef ref for rearward exhaust is not defined.");
    }

    const groupRef = useRef()

    const matcapManager = new MatcapManager()

    const materials = [
        matcapManager.getMatcapByName('dish-support'),
        matcapManager.getMatcapByName('rock-gray'),
        matcapManager.getMatcapByName('phx-gray'),
    ]

    const queue = new FifoQueue(100)

    useFrame((state, delta) => {
        
        const dodecahedron = new THREE.Mesh(
            new THREE.DodecahedronGeometry(1),
            new THREE.MeshMatcapMaterial({ matcap: materials[Math.floor(Math.random() * materials.length)] })
        );
        console.trace(emitterRef.current)
        dodecahedron.position.copy(emitterRef.current.position);

        // Initialize the velocity and spin of the exhaust element
        dodecahedron.velocity = new THREE.Vector3(
            1 * Math.sin(emitterRef.current.rotation.y + 10 + (0.25 * (Math.random()*2-1))), // Last bit adds a random deviation in the x and z directions
            0.1,
            -1 * Math.cos(emitterRef.current.rotation.y + 1 + (0.25 * (Math.random()*2-1)))
        );
        dodecahedron.spin = new THREE.Vector3(
            Math.random() * 0.1,
            Math.random() * 0.1,
            Math.random() * 0.1
        );

        // Add the new element to the group and the queue
        // If an element was removed from the queue, remove it from the group
        groupRef.current.add(dodecahedron);
        const last = queue.enqueue(dodecahedron);
        if (last) {
            groupRef.current.remove(last);
        }

        for (const element of queue) {

            // Calculate the distance to the emitterRef
            const distance = element.position.distanceTo(emitterRef.current.position);

            // Decrease the velocity as a function of the distance to the emitterRef
            const distanceScale = Math.random() * (0.1 - 0.001) + 0.001
            const decreaseFactor = Math.max(0, 1 - distance * .005);
            
            element.velocity.multiplyScalar(decreaseFactor);

            // Move the element according to its velocity
            element.position.add(element.velocity);

            // Increase the y position as a function of the distance to the emitterRef
            const increaseFactor = Math.max(0, distance * 0.0075);
            element.position.y += increaseFactor;

            // Adjust the scale of the element as a function of the distance to the emitterRef
            const scaleFactor = Math.max(0.6, distance * 0.075);
            element.scale.set(scaleFactor, scaleFactor, scaleFactor);

            // Decrease the spin as a function of the distance to the emitterRef
            const spinDecreaseFactor = Math.max(0, 1 - distance * 0.001);
            element.spin.multiplyScalar(spinDecreaseFactor);

            // Apply the spin to the element
            element.rotation.x += element.spin.x;
            element.rotation.y += element.spin.y;
            element.rotation.z += element.spin.z;

        };
    })

    return <>
        <group ref={groupRef}>
            {/* Exhaust elements added to this group */}
        </group>
    </>
}