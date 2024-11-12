import { it, expect, describe, beforeAll } from 'vitest'
import GenericArea from 'src/GenericArea'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextureLoader, MeshBasicMaterial, Group, Mesh } from 'three'
import MatcapManager from 'src/MatcapManager'

beforeAll( () => {
    console.log(process.cwd())
    const loader = new GLTFLoader()
    loader.load('models/test-area.glb', (gltf) => {
        const nodes = gltf.nodes
    })
    const groundTexture = TextureLoader.load('textures/test-texture-1024.png')
    groundTexture.flipY = false
    const groundMaterial = new MeshBasicMaterial({ map: groundTexture })
    const exclusions = [nodes.test_exclusion_1, nodes.test_exclusion_2]
    const matcapMgr = new MatcapManager()
    matcapMgr.loadMatcaps('matcaps', [
        'test-material-1.png',
        'test-material-2.png',
        'test-material-3.png'
    ])
})

describe('GenericArea', () => {
    it('Should create prop meshes', () => {
        // Expecting 3 prop meshes
        const area = GenericArea(nodes, matcapMgr, groundMaterial, exclusions)
        expect(area.props).toHaveLength(3)
        expect(area.props).toBeInstanceOf(Group)
        expect(area.props.children.every()).toBeInstanceOf(Mesh)
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
