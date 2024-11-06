import { it, expect, describe, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import * as THREE from 'three'
import Rocket from '../../src/components/Rocket'
import ReactThreeTestRenderer from '@react-three/test-renderer'

// Mock the useGLTF hook
vi.mock('@react-three/drei', () => ({
    useGLTF: vi.fn(() => ({
      nodes: {
        // Mock nodes data
        node1: { /* mock node data */ },
        node2: { /* mock node data */ },
        // Add more mock nodes as needed
      }
    }))
  }))
  

describe('Rocket', () => {
    it('should render Rocket component', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Rocket/>)
        const children = renderer.scene.children[0].allChildren
        expect(children.length).toBe(0)
    })
    it('should render Rocket component with expected number of children', async () => {
        const meshes = {
            bodyMesh: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)),
            nozzle1Mesh: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)),
            nozzle2Mesh: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)),
            flames1Mesh: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1)),
            flames2Mesh: new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1))
        }

        const materials = {
            bodyMaterial: new THREE.MeshBasicMaterial(),
            nozzleMaterial: new THREE.MeshBasicMaterial(),
            flamesMaterial: new THREE.MeshBasicMaterial()
        }

        const renderer = await ReactThreeTestRenderer.create(<Rocket meshes={meshes} materials={materials}/>)
        const children = renderer.scene.children[0].allChildren
        expect(children.length).toBe(5)
    })
})
