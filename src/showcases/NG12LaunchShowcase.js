import Showcase from "./Showcase"

export default class NG12LaunchShowcase extends Showcase {
    constructor(name, gltf, scene) {
        super(name, gltf, scene)

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