import { useRef, useContext, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { PlayerContext } from 'src/contexts/PlayerContext.jsx'


export default function PlayerCameraTrack() {

    const { nodes } = useGLTF('./models/player-camera-track.glb')

    const trackObj = nodes.player_camera_track
    const points = trackObj.geometry.attributes.position.array

    const trackHeight = 1.5
    const trackDivisions = 50000

    const vec3Points = []
    for (let i = 0; i < points.length; i += 3) {
        vec3Points.push(new THREE.Vector3(points[i], points[i + 1] + trackHeight, points[i + 2]))
    }

    // Create a CatmullRomCurve3 from the track's vector3 points. 
    // This points on this curve will be used to move the camera along the track
    const trackCurve = new THREE.CatmullRomCurve3(vec3Points, true, 'catmullrom')
    const trackPoints = trackCurve.getPoints(trackDivisions)

    const trackProgress = useRef(0); // Begin at the start of the track

    /**
     * Calculate the position of the camera along the track such that the camera is the
     * minimum distance away from the player and never less than TBD distance
     * 
     * TBD distance has to be greatr than the distance from the player to the track. This
     * ensures the camera is always viewing the player from an angle. Could even have a minimum
     * viewing angle and then get the minimum distance from that. 
     * 
     * i.e. Let's say the minimum viewing angle is 45 degrees. That's the angle drawn from:
     *  1. A vector normal to the camera's view
     *  2. A vector pointing straight down from the camera's position
     * In this case, the minimu distance would be calculated as:
     *  minDistance = (trackHeight - lookPosition.y) * cos(minViewAngle)
     * 
     * Easier to see that with a visualization, but I worked it out on some scratch paper.
     * 
     * Have the camera look at a point a few units above the player
     */
    const player = useContext(PlayerContext)
    const minViewAngle = 45 * (Math.PI / 180)

    // TECH DEBT. See note in useEffect. Hacky I don't like this
    let minDistanceFromCameraToPlayer = 0
    let lookAtPosition = new THREE.Vector3()

    /**
     * Calculate the following after the player component has been committed:
     *  1. The minimum distance from the camera to the player
     *  2. The lookAt position as a point a little higher than the player
     */
    // NOTE TODO This being able to run depends on Suspense working in the Experience component. 
    // That's an assumption that I don't think is good to make. Makes this hard to test.
    useEffect(() => {
        /**
         * TECH DEBT
         * These calculations can only be performed if player.current is not null. But that makes minDistanceFromCameraToPlayer and lookAtPosition
         * null during useFrame. For now I suppose I can have conditoinal checks in useFrame, but that's not ideal.
         */
        if (player.current) {
            minDistanceFromCameraToPlayer = (trackHeight - player.current.translation().y) * Math.cos(minViewAngle)
            lookAtPosition = new THREE.Vector3(player.current.translation().x, player.current.translation().y + 2, player.current.translation().z)
            console.log("minDistanceFromCameraToPlayer: ", minDistanceFromCameraToPlayer)
        }
    }, [player.current, minViewAngle])

    // Current behavior animates the camera along the track
    useFrame((state, delta) => {

        /**
         * Determine a point on the track that is at least minDistanceFromCameraToPlayer
         * Dumb first solution:
         *  1. Calculate the distance from the lookAt position to every point on the track
         *  2. Choose the point that is both the closest to minDistanceFromCameraToPlayer and the closest to the current camera position
         *     - Could also convert the found point to a progress on the curve, then compare that against the current progress
         */
        if (player.current) {
            lookAtPosition.set(player.current.translation().x, player.current.translation().y + 2, player.current.translation().z)
            let potentials = []
            for (let i = 0; i < trackPoints.length; i++) {
                let distance = trackPoints[i].distanceTo(lookAtPosition)
                if (distance >= minDistanceFromCameraToPlayer) {
                    potentials.push(
                        { 
                            distance: distance, 
                            point: trackPoints[i],
                            t: i / trackPoints.length,
                            index: i
                        }
                    )
                }
            }

            // Sort the potentials by distance
            potentials = potentials.sort((a, b) => a.distance - b.distance)

            // Drop all potentials except for the first 5
            potentials = potentials.slice(0, 5)

            // Sort the potentials again by the difference between t and the current trackProgress
            potentials.sort((a, b) => Math.abs(a.t - trackProgress.current) - Math.abs(b.t - trackProgress.current))

            // Use the first potential as the new camera position
            const newTrackPosition = potentials[0].point
            trackProgress.current = potentials[0].t

            state.camera.position.copy(newTrackPosition)

            // const lookAtPosition = spline.getPointAt((progress.current + 0.01) % 1);
            state.camera.lookAt(lookAtPosition);
        }
    });

    // NOTE TODO Track is visible with this code. This is not desired in the final release
    const trackGeometry = new THREE.BufferGeometry().setFromPoints(trackPoints)
    const trackMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    return <>
        <line geometry={trackGeometry} material={trackMaterial} scale={trackObj.scale}/>
    </>
}
useGLTF.preload('./models/player-camera-track.glb')