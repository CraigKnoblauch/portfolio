import Showcase from "./Showcase"

export default class NG12LaunchShowcase extends Showcase {
    constructor(name, gltf, scene) {
        super(name, gltf, scene)
        this.setupMeshes(gltf)
        

    }

    setupMeshes(gltf) {
        let node_names = [
            "exhaust_emitter", "rocket", "rocket_nozzle_1", "rocket_nozzle_2", "rocket_cradle",
            "rocket_yellow_flames_1", "rocket_yellow_flames_2",
            "launch_button"
        ]

        this.nodes = {}

        gltf.scene.traverse(node => {
            if (node_names.includes(node.name)) {
                this.nodes[node.name] = node
            }
        })

        // Create rocket animation group. During animations, this group
        // is updated as one
        // my brain just turned off
        this.rocketGroup = new THREE.Group()
        this.rocketGroup.add(this.nodes["rocket"])
        this.rocketGroup.add(this.nodes["rocket_nozzle_1"])
        this.rocketGroup.add(this.nodes["rocket_nozzle_2"])
        this.rocketGroup.add(this.nodes["rocket_yellow_flames_1"])
        this.rocketGroup.add(this.nodes["rocket_yellow_flames_2"])
    }

    update() {
        return undefined
    }

    start() {
        return undefined
    }

    stop() {
        return undefined
    }

    reset() {
        return undefined
    }
}