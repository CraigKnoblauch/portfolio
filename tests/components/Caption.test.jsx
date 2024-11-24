import { it, expect, describe } from 'vitest'
import { waitFor } from '@testing-library/react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import Caption from 'src/components/Caption'

/**
 * TODO: Automate away most of the repeated code.
 * TODO: Understand how to use the reacth three test renderer.
 * TODO: Make any changes reqquired from above. 
 */

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

    it('should create one mesh', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption path={"/textures/vanguard-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const meshes = renderer.scene.children
        expect(meshes.length).toBe(1)
    })

    it('should create a plane with the provided texture applied as an alpha map', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption path={"/textures/vanguard-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const mesh = renderer.scene.children[0].instance
        expect(mesh.material.alphaMap).toBeDefined()
        const alphaMap = mesh.material.alphaMap
        expect(alphaMap.source.data.src).toContain('/textures/vanguard-caption.png')
    })

    it.todo('should set x and z position', async () => {

    })

    it.todo('should set rotation', async () => {

    })

    it.todo('should set length and width', async () => {

    })

    it.todo('should set text color', async () => {

    })
})