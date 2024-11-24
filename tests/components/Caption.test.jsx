import { it, expect, describe, beforeAll } from 'vitest'
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
        const renderer = await ReactThreeTestRenderer.create(<Caption path={"/test/textures/test-caption.png"} />)

        // I use this waitFor to wait until the component is completely done loading. 
        // In the future, I should have something for waiting for the culprit texture to load
        // or pass the texture as a prop.  
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const meshChildren = renderer.scene.children[0].allChildren
        expect(meshChildren.length).toBe(2)
    })

    it('should create one mesh', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption path={"/test/textures/test-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const meshes = renderer.scene.children
        expect(meshes.length).toBe(1)
    })

    it('should create a plane with the provided texture applied as an alpha map', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption path={"/test/textures/test-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const mesh = renderer.scene.children[0].instance
        expect(mesh.material.alphaMap).toBeDefined()
        const alphaMap = mesh.material.alphaMap
        expect(alphaMap.source.data.src).toContain('/textures/test-caption.png')
    })

    it('should set x and z position', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption x={1} z={2} path={"/test/textures/test-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const mesh = renderer.scene.children[0].instance
        expect(mesh.position.x).toBe(1)
        expect(mesh.position.z).toBe(2)
    })

    it('should set rotation', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption rotation={Math.PI/2} path={"/test/textures/test-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const mesh = renderer.scene.children[0].instance
        expect(mesh.rotation.z).toBe(Math.PI/2)
    })

    it('should set length and width', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption length={30} width={40} path={"/test/textures/test-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const mesh = renderer.scene.children[0].instance
        expect(mesh.geometry.parameters.width).toBe(30)
        expect(mesh.geometry.parameters.height).toBe(40)
    })

    it('should set text color', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Caption textColor="red" path={"/test/textures/test-caption.png"} />)
        await waitFor(() => expect(renderer.scene.children[0].allChildren).toBeDefined())
        const mesh = renderer.scene.children[0].instance
        expect(mesh.material.color.getHexString()).toBe('ff0000')
    })

    it.todo('should not z-fight with a ground plane'), async () => {

    }
})
