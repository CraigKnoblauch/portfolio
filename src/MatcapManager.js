import { TextureLoader } from 'three'

/**
 * Manages the loading and retrieval of matcaps.
 * Matcaps are flywheels in this application.
 */
export default class MatcapManager {
    constructor() {}

    loadMatcaps(matcapFiles) {
        Object.keys(matcapFiles).forEach((imageFilename) => {
            const materialName = imageFilename.split('.')[0]
            this.matcaps[materialName] = null //useLoader(TextureLoader, ['./matcaps/' + imageFilename]) // Load the matcap
        })
    }

    getMatcapByName(name) {
        return this.matcaps[name]
    }
}
