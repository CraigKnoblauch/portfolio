import { it, expect, describe } from 'vitest'
import { waitFor } from '@testing-library/react'
import Caption from 'src/components/Caption'
import ReactThreeTestRenderer from '@react-three/test-renderer'

describe('Caption', () => {
    it('should render a Caption component', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption path={"/textures/vanguard-caption.png"} />)

        // I use this waitFor to wait until the component is completely done loading. 
        // In the future, I should have something for waiting for the culprit texture to load
        // or pass the texture as a prop.
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const meshChildren = renderer.scene.children[0].allChildren
        expect(meshChildren.length).toBe(2)
    })
})
