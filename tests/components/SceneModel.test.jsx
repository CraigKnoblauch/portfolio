import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest'
import * as THREE from 'three'
import SceneModel from '../../src/components/SceneModel';

import ReactThreeTestRenderer from '@react-three/test-renderer'

describe('SceneModel', () => {
    it('should render SceneModel component', async () => {
        const renderer = await ReactThreeTestRenderer.create(<SceneModel meshMaterialPairs={[]} />)
        const children = renderer.scene.children[0].allChildren
        expect(children.length).toBe(0)
    })

    it('should render SceneModel component with expected number of children', async () => {
        const meshes = 
        [
            [
                new THREE.Mesh(new THREE.BoxGeometry()),
                new THREE.MeshBasicMaterial({ color: 0xff0000 })
            ],
            [
                new THREE.Mesh(new THREE.BoxGeometry()),
                new THREE.MeshBasicMaterial({ color: 0x00ff00 })
            ],
            [
                new THREE.Mesh(new THREE.BoxGeometry()),
                new THREE.MeshBasicMaterial({ color: 0x0000ff })
            ]
        ] 
        const renderer = await ReactThreeTestRenderer.create(<SceneModel meshMaterialPairs={meshes} />)
        const children = renderer.scene.children[0].allChildren
        expect(children.length).toBe(3)
    })
})