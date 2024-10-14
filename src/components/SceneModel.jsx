import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'

export default function SceneModel( { meshMaterialPairs } ) {

    const group = useRef(new THREE.Group())

    useEffect(() => {
        const currentGroup = group.current
        meshMaterialPairs.forEach(([mesh, material]) => {
            mesh.material = material
            currentGroup.add(mesh)
        })
        return () => {
            meshMaterialPairs.forEach(([mesh]) => {
                currentGroup.remove(mesh)
            })
        }
    }, [meshMaterialPairs])
    
    return <>
        <group ref={group} />
    </>
}
SceneModel.propTypes = {
    meshMaterialPairs: PropTypes.arrayOf(PropTypes.array).isRequired
};
