import { it, expect, describe, beforeAll } from 'vitest'
import GenericArea from 'src/GenericArea'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial, Group, Mesh } from 'three'
import MatcapManager from 'src/MatcapManager'

describe('GenericArea', () => {
    it('Should create prop meshes', () => {
        const loader = new GLTFLoader()
        loader.load('./test/models/test-area.glb', (gltf) => {
            expect(gltf.scene).not.toBeUndefined()
            console.log("GLTF in before all")
            console.log(gltf)
            const textureLoader = new TextureLoader()
            const groundTexture = textureLoader.load('test/textures/test-texture-1024.png')
            groundTexture.flipY = false
            const groundMaterial = new MeshBasicMaterial({ map: groundTexture })
            const matcapMgr = new MatcapManager()
            matcapMgr.loadMatcaps('test/matcaps', [
                'test-material-1.png',
                'test-material-2.png',
                'test-material-3.png'
            ])

            // Expecting 3 prop meshes
            console.log("GLTF")
            console.log(gltf)
            const area = new GenericArea(gltf, matcapMgr, groundMaterial, ["test_exclusion_1", "test_exclusion_2"])
            expect(area.props).toHaveLength(3)
            expect(area.props).toBeInstanceOf(Group)
            expect(area.props.children.every()).toBeInstanceOf(Mesh)
        })
    })

    it.todo('Should add all prop meshes to final group', () => {
        
    })

    it.todo('Should texture all prop meshes with corresponding matcap material', () => {

    })

    it.todo('Should texture all prop meshes with corresponding matcap material', () => {
        
    })

    it.todo('Should configure all prop meshes to the correct position and rotation', () => {

    })

    it.todo('Should create ground mesh', () => {
        
    })

    it.todo('Should texture ground mesh', () => {
        
    })

    it.todo('Should configure ground to the correct position and rotation', () => {

    })

    it.todo('Should add props and ground to final group', () => {
        
    })
})
