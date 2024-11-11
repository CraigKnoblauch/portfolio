import { Group, Mesh } from 'three'

export default class GenericArea {
    constructor(nodes, matcapMgr, groundMaterial, exclusions) {
        this.matcapMgr = matcapMgr
        this.group = new Group()
        this.props = new Group()

        this.configureProps(nodes, exclusions)

        const groundMesh = Object.values(nodes).find(mesh_obj => mesh_obj.isMesh && mesh_obj.name.includes("ground"))
        if (groundMesh) {
            this.ground = new Mesh(groundMesh.geometry, groundMaterial)
            this.ground.position.set(groundMesh.position)
            this.ground.rotation.set(groundMesh.rotation)
        }

        this.group.add(this.props)
        if (this.ground) { 
            this.group.add(this.ground) 
        }
    }

    configureProps(nodes, exclusions) {
        Object.entries(nodes).map(([, mesh_obj]) => {
            if (mesh_obj.isMesh && !exclusions.includes(mesh_obj) && !mesh_obj.name.includes("ground")) {
                const material = this.matcapMgr.getMatcapByName(mesh_obj.material.name)
                const mesh = new Mesh(mesh_obj.geometry, material)
                mesh.position.set(mesh_obj.position)
                mesh.rotation.set(mesh_obj.rotation)
                this.props.add(mesh)
            }
        })
    }

}