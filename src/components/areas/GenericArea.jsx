import { RigidBody } from '@react-three/rapier'
import { v4 as uuidv4 } from 'uuid'

import MatcapManager from 'src/MatcapManager.js'


export default function GenericArea({nodes, exclusions=[]}) {

    const matcapManager = new MatcapManager()

    return <>

            {Object.entries(nodes).map(([key, mesh_obj]) => (
                
                // TODO Idea for performance improvement: If the object sits higher than the height of the rabbit, don't put a collider on it
                
                //   Popuate this mesh component if the following are true
                //      1. The object is a mesh
                //      3. The object is not in the exclusions array
                //
                //   If the the object is a tile, don't put colliders on the mesh
                //   NOTE: The better thing would be to have one mesh definition, then have the rigid body
                //         say something like "colliders={!mesh_obj.name.includes("tile")}" but for whatever reason, colliders={true} creates a ton of errors
                mesh_obj.isMesh && !exclusions.includes(mesh_obj)) && (
                    mesh_obj.name.includes("tile") ? (
                        <RigidBody type="fixed" 
                                   key={uuidv4()}
                                   colliders={false}
                        >
                            <mesh key={mesh_obj.uuid}
                                geometry={mesh_obj.geometry}
                                position={mesh_obj.position} 
                                rotation={mesh_obj.rotation} 
                                scale={mesh_obj.scale}
                            >
                                
                                <meshMatcapMaterial matcap={matcapManager.getMatcapByName(mesh_obj.material.name)} />
                            
                            </mesh>
                        </RigidBody>
                    ) : (
                        <RigidBody type="fixed" 
                                   key={uuidv4()}
                        >
                            <mesh key={mesh_obj.uuid}
                                  geometry={mesh_obj.geometry}
                                  position={mesh_obj.position} 
                                  rotation={mesh_obj.rotation} 
                                  scale={mesh_obj.scale}
                            >
                                
                                <meshMatcapMaterial matcap={matcapManager.getMatcapByName(mesh_obj.material.name)} />
                            
                            </mesh>
                        </RigidBody>
                    )
                )
            )} 

    </>
}
