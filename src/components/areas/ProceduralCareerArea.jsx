import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useLoader } from "@react-three/fiber"

export default function ProceduralCareerArea(props) {
    const { nodes } = useGLTF('./models/career-area.glb')

    console.log(nodes)
    
    return <>

        <group {...props} dispose={null}>

            {/**
             * Add a mesh for each mesh in the nodes array
             */}
            {Object.entries(nodes).map(([key, mesh_obj]) => (

                console.log(mesh_obj),

                mesh_obj.isObject3D && mesh_obj.type === "Mesh" && (
                    <mesh key={key}
                          geometry={mesh_obj.geometry}
                          position={[mesh_obj.position.x, mesh_obj.position.y, mesh_obj.position.z]} 
                          rotation={[mesh_obj.rotation._x, mesh_obj.rotation._y, mesh_obj.rotation._z]} 
                          scale={[mesh_obj.scale.x, mesh_obj.scale.y, mesh_obj.scale.z]}>
                        
                        {/* 
                            TODO Change all the logical names of the materials to their png file name counterpart
                            TODO It would be more efficent to load all the textures at once and then assign them to the materials here.
                        */}
                        <meshMatcapMaterial matcap={useLoader(THREE.TextureLoader, ["./matcaps/" + mesh_obj.material.name + ".png"])} />
                    
                    </mesh>
                )
            ))}

        </group>

    </>
}