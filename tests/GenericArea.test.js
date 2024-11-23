import { it, expect, describe, beforeAll } from 'vitest'
import GenericArea from 'src/GenericArea'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial, Group, Mesh, Scene } from 'three'
import MatcapManager from 'src/MatcapManager'

const countMeshesInGroup = (group) => {
    return group.children.filter((child) => child instanceof Mesh).length;
};
  

describe('GenericArea', () => {
    it('Should create prop meshes', async () => {
        const textureLoader = new TextureLoader()
        const groundTexture = textureLoader.load('test/textures/test-texture-1024.png')
        groundTexture.flipY = false
        const groundMaterial = new MeshBasicMaterial({ map: groundTexture })
        const matcapMgr = new MatcapManager()
        matcapMgr.loadMatcaps('/test/matcaps', [
            'test-material-1.png',
            'test-material-2.png',
            'test-material-3.png'
        ])

        let area = null
        const loader = new GLTFLoader()
        const loaderPromise = new Promise((resolve, reject) => {
            loader.load('/test/models/test-area.glb', (gltf) => {
                // Expecting 4 total meshes in the scene
                area = new GenericArea(gltf, matcapMgr, groundMaterial, ["test_exclusion_1", "test_exclusion_2"])
                console.log(area.group)
                resolve(area)
            }, undefined, (error) => { reject(error) })
        })

        await loaderPromise
            .then((area) => { expect(countMeshesInGroup(area.group)).toEqual(4) })
            .catch((error) => { expect.fail(error) })        
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
