import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'

import MatcapManager from 'src/MatcapManager.js'
import FifoQueue from 'src/FifoQueue.js'

export default function RocketFlames({nozzleRefs}) {
    if (nozzleRefs.length !== 2) {
        throw new Error('nozzleRefs array length must be equal to 2');
    }

    const groupRef = useRef()

    const matcapManager = new MatcapManager()
    const yellowFlame = new THREE.MeshMatcapMaterial({matcap: matcapManager.getMatcapByName('gold')})
    const blueFlame = new THREE.MeshMatcapMaterial({matcap: matcapManager.getMatcapByName('lite-blue')})

    const queue = new FifoQueue(100)

    useFrame((state, delta) => {

        // Create a new piece of flame exhaust
        const dodecahedron = new THREE.Mesh(
            new THREE.DodecahedronGeometry(0.1),
            yellowFlame // Starts with a gold flame
        );
        
        /**
         * Originate a flame element from a random nozzle
         * The positions of the nozzle refs don't update with the group they are in.
         * To get around that, request the world position of the nozzle ref
         * Which nozzle to use is a random choice. 
         */
        const initialPosition = new THREE.Vector3(0, 0, 0);
        const nozzleRef = Math.random() < 0.5 ? nozzleRefs[0] : nozzleRefs[1];
        nozzleRef.current.getWorldPosition(initialPosition);
        dodecahedron.position.copy(initialPosition);

        dodecahedron.velocity = new THREE.Vector3(
            0,
            -0.1,
            0
        );

        // Add the new element to the group and the queue
        // If an element was removed from the queue, remove it from the group
        groupRef.current.add(dodecahedron)
        const last = queue.enqueue(dodecahedron);
        if (last) {
            groupRef.current.remove(last);
        }

        for (const element of queue) {

            // Move the flame down
            element.position.add(element.velocity);

            // Change the flame color as it moves down
            if (element.position.y < 2) {
                element.material = blueFlame
            }
    
        }

    })

    return <>
        <group ref={groupRef}>
            {/* Flame elements will be populated in here */}
        </group>
    </>
}