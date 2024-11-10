import { TextureLoader } from 'three'
import { matcapImages } from 'src/matcapImages.js'

/**
 * Manages the loading and retrieval of matcaps.
 * Matcaps are flywheels in this application.
 */
export default class MatcapManager {
    constructor() {
        if (!MatcapManager.instance) {
            this.matcaps = {}
            this.loadMatcaps()
            MatcapManager.instance = this
        }

        return MatcapManager.instance
    }

    loadMatcaps() {
        matcapImages.forEach((imageFilename) => {
            const materialName = imageFilename.split('.')[0]
            this.matcaps[materialName] = null //useLoader(TextureLoader, ['./matcaps/' + imageFilename]) // Load the matcap
        })
    }

    getMatcapByName(name) {
        return this.matcaps[name]
    }
}
