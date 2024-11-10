import { it, expect, describe } from 'vitest'
import MatcapManager from '../src/MatcapManager'
import { TextureLoader } from 'three'

describe('MatcapManager', () => {
    it('Should not be a singleton', () => {
        const mm1 = new MatcapManager()
        const mm2 = new MatcapManager()
        expect(mm1).not.toBe(mm2)
    })

    it('Should load matcaps', () => {
        const textureLoader = new TextureLoader()
        const mm = new MatcapManager()
        mm.loadMatcaps([
            'test-material-1.png',
            'test-material-2.png',
            'test-material-3.png'
        ])
        expect(mm.matcaps['test-material-1']).toBe(textureLoader.load('./matcaps/test-material-1.png'))
        expect(mm.matcaps['test-material-2']).toBe(textureLoader.load('./matcaps/test-material-2.png'))
        expect(mm.matcaps['test-material-3']).toBe(textureLoader.load('./matcaps/test-material-3.png'))
    })
})