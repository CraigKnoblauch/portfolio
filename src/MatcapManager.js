import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { matcapImages } from 'src/matcapImages.js';

/**
 * Manages the loading and retrieval of matcaps.
 * Matcaps are flywheels in this application.
 */
export default class MatcapManager {
    constructor() {
        this.matcaps = {};

        if (!this.instance) {
            this.loadMatcaps();
            this.instance = this;
        }
        
        return this.instance;
    }

    loadMatcaps() {
        matcapImages.forEach((imageFilename) => {
            const materialName = imageFilename.split('.')[0]; // Remove the file extension
            [this.matcaps[materialName]] = useLoader(TextureLoader, ['./matcaps/' + imageFilename]); // Load the matcap
        });
    }

    getMatcapByName(name) {
        return this.matcaps[name];
    }
}

// Singleton instance
// const matcapManager = new MatcapManager();
// matcapManager.loadMatcaps();

// console.log(matcapManager.matcaps);

// Export the singleton instance
// export default MatcapManager;
