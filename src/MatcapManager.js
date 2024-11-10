import { TextureLoader } from 'three'

/**
 * Manages the loading and retrieval of matcaps.
 * Matcaps are flywheels in this application.
 */
export default class MatcapManager {
    constructor() {
        this.matcaps = {}
        this.textureLoader = new TextureLoader()
    }

    loadMatcaps(matcapFiles) {
        Object.keys(matcapFiles).forEach((imageFilename) => {
            const materialName = imageFilename.split('.')[0]
            this.matcaps[materialName] = this.textureLoader.load('./matcaps/' + imageFilename) // Load the matcap
        })
        console.log(this.matcaps)
    }

    getMatcapByName(name) {
        return this.matcaps[name]
    }
}
