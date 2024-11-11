import { Group, Mesh } from 'three'

export default class GenericArea {
    constructor(nodes, matcapMgr, groundMaterial, exclusions) {
        this.matcapMgr = matcapMgr
        this.group = new Group()

        this.configureProps(nodes, exclusions)

        const groundMesh = Object.values(nodes).find(mesh_obj => mesh_obj.isMesh && mesh_obj.name.includes("ground"))
        if (groundMesh) {
            this.configureGround(groundMesh, groundMaterial)
        }
    }

    configureProps(nodes, exclusions) {
        Object.entries(nodes).map(([, mesh_obj]) => {
            if (mesh_obj.isMesh && !exclusions.includes(mesh_obj) && !mesh_obj.name.includes("ground")) {
                const material = this.matcapMgr.getMatcapByName(mesh_obj.material.name)
                const mesh = new Mesh(mesh_obj.geometry, material)
                // TODO How do I set the position, rotation, and scale of the mesh
                this.group.add(mesh)
            }
        })
    }

    configureGround(ground, groundMaterial) {
        const groundMesh = new Mesh(ground.geometry, groundMaterial)
        this.group.add(groundMesh)
    }
}