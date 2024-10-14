import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest'
import SceneModel from '../../src/components/SceneModel';

import ReactThreeTestRenderer from '@react-three/test-renderer'

describe('SceneModel', () => {
    it('should render SceneModel component', async () => {
        const renderer = await ReactThreeTestRenderer.create(<SceneModel meshMaterialPairs={[]} />)
        const children = renderer.scene.children[0].allChildren
        expect(children.length).toBe(0)
    })
})