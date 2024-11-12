import { it, expect, describe, beforeAll } from 'vitest'
import Showcase from '../../src/showcases/Showcase'
import { Scene } from 'three'

describe('Showcase', () => {
    it('should instantiate initial values', () => {
        // Expecting 3 prop meshes
        const showcase = new Showcase('test-showcase', null, new Scene())
        expect(showcase.name).toBe('test-showcase')
        expect(showcase.gltf).toBe(null)
        expect(showcase.scene).toBeInstanceOf(Scene)
    })

    it('should return undefined on update', () => {
        const showcase = new Showcase('test-showcase', null, new Scene())
        expect(showcase.update()).toBeUndefined()
    })

    it('should return undefined on start', () => {
        const showcase = new Showcase('test-showcase', null, new Scene())
        expect(showcase.start()).toBeUndefined()
    })

    it('should return undefined on stop', () => {
        const showcase = new Showcase('test-showcase', null, new Scene())
        expect(showcase.stop()).toBeUndefined()
    })

    it('should return undefined on reset', () => {
        const showcase = new Showcase('test-showcase', null, new Scene())
        expect(showcase.reset()).toBeUndefined()
    })
})
