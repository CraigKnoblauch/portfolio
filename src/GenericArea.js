import { Group, Mesh } from 'three'
import { MeshBasicMaterial, BoxGeometry } from 'three'

export default class GenericArea {
    constructor(gltf, scene, matcapMgr, groundMaterial, exclusions) {
        this.matcapMgr = matcapMgr

        gltf.scene.children.forEach(node => {
            if (node.name.includes("ground")) {
                this.ground = new Mesh(node.geometry, groundMaterial)
                scene.add(this.ground)

                this.ground.position.copy(node.position)
                this.ground.rotation.copy(node.rotation)
                this.ground.scale.copy(node.scale)
                
            } else if (!exclusions.includes(node.name) && node.isMesh) {
                const material = this.matcapMgr.getMatcapByName(node.material.name)
                const mesh = new Mesh(node.geometry, material)
                
                scene.add(mesh)

                // update transforms
                mesh.position.copy(node.position)
                mesh.rotation.copy(node.rotation)
                mesh.scale.copy(node.scale)
            }
        })
    }
}