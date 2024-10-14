import SceneModel from 'src/components/SceneModel'
import { useTexture } from "@react-three/drei"
import * as THREE from 'three'
// TODO import rocket flames shader material
import MatcapManager from 'src/MatcapManager.js'
import PropTypes from 'prop-types'

/**
 * TODO
 * Current problems things to think about:
 *  - How is position set such that it's relative to the other components. You can't use the same
 *    position as you get out of the glb. For example the body needs to be at 0, 0, while the cradle
 *    a totally different component, needs to be offset but that offset needs to be relative to the body,
 *    without the cradle knowing about the body
 *  - Without access to the underlying group ref in the SceneModel, how do you animate the rocket?
 *  - What's the right amount of dependency injection vs internal definition. I'm thinking if it's an
 *    external system that would be difficult to get online, it should be mocked. Or if for example its 
 *    a heavy model. Otherwise I think it should be internal.
 */
export default function Rocket( { nodes } ) {

    if (!nodes) {
        return <SceneModel meshMaterialPairs={[]} />
    }

    const matcaps = new MatcapManager()

    /**
     * Materials
     */
    // TODO NOTE Might want to mock MatcapManager, thus take it as dependency injection
    const nozzleMaterial = matcaps.matcapMaterial('silver')

    const bodyMaterial = useTexture('./texture/rocket-uv-map.jpg')

    // TODO replace with shader material
    const flamesMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

    /**
     * Meshes
     */
    const bodyMesh = new THREE.Mesh(nodes.body.geometry)
    const nozzle1Mesh = new THREE.Mesh(nodes.rocket_nozzle_1.geometry)
    const nozzle2Mesh = new THREE.Mesh(nodes.rocket_nozzle_2.geometry)
    const flames1Mesh = new THREE.Mesh(nodes.yellow_flames_1.geometry)
    const flames2Mesh = new THREE.Mesh(nodes.yellow_flames_2.geometry)

    return (
        <SceneModel meshMaterialPairs={[
            [bodyMesh, bodyMaterial],
            [nozzle1Mesh, nozzleMaterial],
            [nozzle2Mesh, nozzleMaterial],
            [flames1Mesh, flamesMaterial],
            [flames2Mesh, flamesMaterial]
        ]} />
    )
}
Rocket.propTypes = {
    nodes: PropTypes.object.isRequired
};