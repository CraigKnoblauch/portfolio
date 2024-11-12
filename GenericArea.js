import { Group, Mesh } from 'three'
import { MeshBasicMaterial, BoxGeometry } from 'three'

export default class GenericArea {
    constructor(gltf, matcapMgr, groundMaterial, exclusions) {
        this.matcapMgr = matcapMgr
        this.group = new Group()
        this.props = new Group()

        gltf.scene.traverse(node => {
            if (node.name.includes("ground")) {
                this.ground = new Mesh(node.geometry, groundMaterial)
            } else if (!exclusions.includes(node.name) && node.isMesh) {
                const material = this.matcapMgr.getMatcapByName(node.material.name)
                const mesh = new Mesh(node.geometry, material)
                this.props.add(mesh)
            }
        })

        this.group.add(this.props)
        if (this.ground) { 
            this.group.add(this.ground) 
        }
    }
}