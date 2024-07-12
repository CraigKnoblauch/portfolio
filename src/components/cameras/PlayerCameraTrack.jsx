import { useRef, useContext, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import { PlayerContext } from 'src/contexts/PlayerContext.jsx'


export default function PlayerCameraTrack() {

    const { nodes } = useGLTF('./models/player-camera-track.glb')

    const trackObj = nodes.player_camera_track
    const points = trackObj.geometry.attributes.position.array

    const trackHeight = 4.5

    const vec3Points = []
    for (let i = 0; i < points.length; i += 3) {
        vec3Points.push(new THREE.Vector3(points[i], points[i + 1] + trackHeight, points[i + 2]))
    }

    // Create a CatmullRomCurve3 from the track's vector3 points. 
    // This points on this curve will be used to move the camera along the track
    const trackCurve = new THREE.CatmullRomCurve3(vec3Points, true, 'catmullrom')

    const progress = useRef(0);

    /**
     * TODO
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

    // Calculate the minimum distance from the camera to the player after the player component has been committed
    useEffect(() => {
        const minDistanceFromCameraToPlayer = (trackHeight - player.current.translation().y) * Math.cos(minViewAngle)
        console.log("minDistanceFromCameraToPlayer: ", minDistanceFromCameraToPlayer)
    }, [minViewAngle, player])
    
    // Current behavior animates the camera along the track
    useFrame((state, delta) => {
        progress.current += delta * 0.1; // Adjust speed as needed
        if (progress.current > 1) progress.current = 0;

        // Calculate the distance 

        const position = trackCurve.getPoint(progress.current);
        // state.camera.position.copy(position);

        // const lookAtPosition = spline.getPointAt((progress.current + 0.01) % 1);
        // state.camera.lookAt(player.current.translation());
    });

    // NOTE TODO Track is visible with this code. This is not desired in the final release
    const trackGeometry = new THREE.BufferGeometry().setFromPoints(trackCurve.getPoints(50))
    const trackMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    return <>
        <line geometry={trackGeometry} material={trackMaterial} scale={trackObj.scale}/>
    </>
}
useGLTF.preload('./models/player-camera-track.glb')