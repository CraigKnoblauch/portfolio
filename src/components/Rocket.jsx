import SceneModel from 'src/components/SceneModel'
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
export default function Rocket( { meshes, materials } ) {

    if (!meshes || !materials) {
        return <SceneModel meshMaterialPairs={[]} />
    }

    return (
        <SceneModel meshMaterialPairs={[
            [meshes.bodyMesh, materials.bodyMaterial],
            [meshes.nozzle1Mesh, materials.nozzleMaterial],
            [meshes.nozzle2Mesh, materials.nozzleMaterial],
            [meshes.flames1Mesh, materials.flamesMaterial],
            [meshes.flames2Mesh, materials.flamesMaterial]
        ]} />
    )
}
Rocket.propTypes = {
    meshes: PropTypes.object.isRequired,
    materials: PropTypes.object.isRequired
};