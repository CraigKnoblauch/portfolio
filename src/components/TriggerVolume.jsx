import { isMobile } from "react-device-detect"
import { RigidBody, CuboidCollider } from "@react-three/rapier"
import { v4 as uuidv4 } from 'uuid'

export default function TriggerVolume({model, link}) {

    console.log(model.geometry)
    // const { length, width, height } = model.geometry.parameters;

    return (
        <>
            <RigidBody type="fixed"
                       onIntersectionEnter={() => {console.log("Intersection Enter")}}
                       onIntersectionExit={() => {console.log("Intersection Exit")}}
                       sensor={true}
            >
                
                <mesh geometry={model.geometry}
                        position={model.position}
                        rotation={model.rotation}
                        scale={model.scale}
                        visible={true}
                        onClick={() => window.location.href = link}
                >
                    <meshBasicMaterial color="red" wireframe />
                </mesh>
            </RigidBody>
        </>
    );
}