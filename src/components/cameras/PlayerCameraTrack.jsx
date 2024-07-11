import { useContext, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import { PlayerContext } from 'src/contexts/PlayerContext.jsx'
import { useFrame } from '@react-three/fiber'

export default function PlayerCameraTrack() {

    const { nodes } = useGLTF('./models/player-camera-track.glb')
    const player = useContext(PlayerContext)

    const trackObj = nodes.player_camera_track
    const points = trackObj.geometry.attributes.position.array

    const trackCurve = new THREE.CatmullRomCurve3(points)

    const progress = useRef(0);

    useFrame((state, delta) => {
        progress.current += delta * 0.1; // Adjust speed as needed
        if (progress.current > 1) progress.current = 0;

        const position = trackCurve.getPoint(progress.current);
        console.log(position)
        state.camera.position.copy(position);

        // const lookAtPosition = spline.getPointAt((progress.current + 0.01) % 1);
        cameraRef.current.lookAt(player.current.translation());
    });

    return <>
        {/* <primitive geometry={trackCurve} position={trackObj.position} /> */}
    </>
}
useGLTF.preload('./models/player-camera-track.glb')