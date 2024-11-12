import { TextureLoader, MeshMatcapMaterial } from 'three'

/**
 * Manages the loading and retrieval of matcaps.
 * Matcaps are flywheels in this application.
 */
export default class MatcapManager {
    constructor() {
        this.matcaps = {}
        this.textureLoader = new TextureLoader()
    }

    loadMatcaps(dir, files) {
        files.forEach((imageFilename) => {
            const materialName = imageFilename.split('.')[0]
            const texture = this.textureLoader.load(dir + '/' + imageFilename) // Load the matcap
            this.matcaps[materialName] = new MeshMatcapMaterial({ map: texture })
        })
        console.log(this.matcaps)
    }

    getMatcapByName(name) {
        return this.matcaps[name]
    }
}
