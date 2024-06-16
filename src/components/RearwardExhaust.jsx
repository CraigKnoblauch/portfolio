import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'
import PropTypes from 'prop-types'

import MatcapManager from 'src/MatcapManager.js'
import FifoQueue from 'src/FifoQueue.js'


/**
 * TODO
 * Put isVisible and terminate in a ref object
 * isVisible initiates the animation
 * terminate stops the animation. In this case I can't just delete all elements, I have to pop the queue until it's empty
 */
export default function RearwardExhaust({emitter, exhaustRef}) {

    if (!emitter) {
        throw new Error("Emitter for rearward exhaust is not defined.");
    }

    const groupRef = useRef()

    const matcapManager = new MatcapManager()

    const materials = [
        matcapManager.getMatcapByName('dish-support'),
        matcapManager.getMatcapByName('rock-gray'),
        matcapManager.getMatcapByName('phx-gray'),
    ]

    const queue = new FifoQueue(100)

    // eslint-disable-next-line no-unused-vars
    useFrame((state, delta) => {
        
        if ( exhaustRef.current.isVisible ) { // NOTE TODO Using a ref like this is not the best way to handle this. It's a workaround for now.
            const dodecahedron = new THREE.Mesh(
                new THREE.DodecahedronGeometry(1),
                new THREE.MeshMatcapMaterial({ matcap: materials[Math.floor(Math.random() * materials.length)] })
            );
            dodecahedron.position.copy(emitter.position);

            dodecahedron.velocity = new THREE.Vector3(
                Math.sin(-emitter.rotation.z + (0.25 * (Math.random()*2-1))), // Last bit adds a random deviation in the x and z directions
                0.1,
                Math.cos(-emitter.rotation.z + (0.25 * (Math.random()*2-1)))
            );
            dodecahedron.spin = new THREE.Vector3(
                Math.random() * 0.1,
                Math.random() * 0.1,
                Math.random() * 0.1
            );

            // If terminated, don't add new elements to the group or the queue, instead, remove them one by one
            // TODO Refactor the above to only happen when necessary (v1.0 fix)

            if (!exhaustRef.current.terminate) {
                // Add the new element to the group and the queue
                // If an element was removed from the queue, remove it from the group
                groupRef.current.add(dodecahedron);
                const last = queue.enqueue(dodecahedron);
                if (last) {
                    groupRef.current.remove(last);
                }
            } else {
                groupRef.current.remove(queue.shift());
            }

            for (const element of queue) {

                // Calculate the distance to the emitter
                const distance = element.position.distanceTo(emitter.position);

                // Decrease the velocity as a function of the distance to the emitter
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

            }
        }
    })

    return <>
        <group ref={groupRef}>
            {/* Exhaust elements added to this group */}
        </group>
    </>
}
RearwardExhaust.propTypes = {
    emitter: PropTypes.object.isRequired,
    exhaustRef: PropTypes.object.isRequired
}