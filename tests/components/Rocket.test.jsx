import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import Rocket from '../../src/components/Rocket'
import ReactThreeTestRenderer from '@react-three/test-renderer'

describe('Rocket', () => {
    it('should render Rocket component', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Rocket/>)
        const children = renderer.scene.children[0].allChildren
        expect(children.length).toBe(0)
    })
    it('should render Rocket component with expected number of children', async () => {
        const { nodes } = useGLTF('./models/career-area.glb')
        console.log(nodes)
        const renderer = await ReactThreeTestRenderer.create(<Rocket nodes={nodes}/>)
        const children = renderer.scene.children[0].allChildren
        expect(children.length).toBe(5)
    })
})
