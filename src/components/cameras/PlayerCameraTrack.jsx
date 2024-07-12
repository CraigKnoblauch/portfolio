import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'


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

    // Current behavior animates the camera along the track
    useFrame((state, delta) => {
        progress.current += delta * 0.1; // Adjust speed as needed
        if (progress.current > 1) progress.current = 0;

        const position = trackCurve.getPoint(progress.current);
        state.camera.position.copy(position);

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