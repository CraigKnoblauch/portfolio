import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useLoader } from "@react-three/fiber"
import MatcapManager from 'src/MatcapManager.js'
import GenericArea from "src/components/areas/GenericArea"

export default function CareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')
    const matcapManager = new MatcapManager()
    
    return <>

        <group {...props} dispose={null}>

            <GenericArea nodes={nodes} />

        </group>

    </>
}