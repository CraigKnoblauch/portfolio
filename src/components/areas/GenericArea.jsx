import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useLoader } from "@react-three/fiber"
import MatcapManager from 'src/MatcapManager.js'

export default function GenericArea({nodes, exclusions=[]}) {

    const matcapManager = new MatcapManager()

    return <>

        
        {Object.entries(nodes).map(([key, mesh_obj]) => (
            
            //   Popuate this mesh component if the following are true
            //      1. The object .isObject3D is true
            //      2. The object type is "Mesh"
            //      3. The object is not in the exclusions array
            mesh_obj.isObject3D && mesh_obj.type === "Mesh" && !exclusions.includes(mesh_obj) && (
                <mesh key={mesh_obj.uuid}
                      geometry={mesh_obj.geometry}
                      position={[mesh_obj.position.x, mesh_obj.position.y, mesh_obj.position.z]} 
                      rotation={[mesh_obj.rotation._x, mesh_obj.rotation._y, mesh_obj.rotation._z]} 
                      scale={[mesh_obj.scale.x, mesh_obj.scale.y, mesh_obj.scale.z]}>
                    
                    <meshMatcapMaterial matcap={matcapManager.getMatcapByName(mesh_obj.material.name)} />
                
                </mesh>
            )
        ))} 

    </>
}
