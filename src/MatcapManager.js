import * as THREE from 'three'

/**
 * Manages the loading and retrieval of matcaps.
 * Matcaps are flywheels in this application.
 */
export default class MatcapManager {
    constructor() {
        this.matcaps = {}
        this.textureLoader = new THREE.TextureLoader()
    }

    loadMatcaps(dir, files) {
        files.forEach((imageFilename) => {
            const materialName = imageFilename.split('.')[0]
            const texture = this.textureLoader.load(dir + '/' + imageFilename) // Load the matcap
            texture.colorSpace = THREE.SRGBColorSpace
            this.matcaps[materialName] = new THREE.MeshMatcapMaterial({ matcap: texture })
        })
    }

    getMatcapByName(name) {
        return this.matcaps[name]
    }
}
