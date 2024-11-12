import { it, expect, describe } from 'vitest'
import MatcapManager from 'src/MatcapManager'
import { MeshMatcapMaterial } from 'three'

describe('MatcapManager', () => {
    it('Should not be a singleton', () => {
        const mm1 = new MatcapManager()
        const mm2 = new MatcapManager()
        expect(mm1).not.toBe(mm2)
    })

    it('Should load matcap', () => {
        const mm = new MatcapManager()
        mm.loadMatcaps('matcaps', [
            'test-material-1.png'
        ])
        expect(mm.matcaps['test-material-1']).toBeInstanceOf(MeshMatcapMaterial)
    })

    it('Should load matcaps', () => {
        const mm = new MatcapManager()
        mm.loadMatcaps('matcaps', [
            'test-material-1.png',
            'test-material-2.png',
            'test-material-3.png'
        ])
        expect(mm.matcaps['test-material-1']).toBeInstanceOf(MeshMatcapMaterial)
        expect(mm.matcaps['test-material-2']).toBeInstanceOf(MeshMatcapMaterial)
        expect(mm.matcaps['test-material-3']).toBeInstanceOf(MeshMatcapMaterial)
    })

    it('Should get matcap by name', () => {
        const mm = new MatcapManager()
        mm.loadMatcaps('matcaps', [
            'test-material-1.png'
        ])
        const material = mm.getMatcapByName('test-material-1')
        expect(material).toBeInstanceOf(MeshMatcapMaterial)
    })

    it('Should return undefined if matcap not found', () => {
        const mm = new MatcapManager()
        mm.loadMatcaps('matcaps', [
            'test-material-1.png'
        ])
        const material = mm.getMatcapByName('non-existent-material')
        expect(material).toBeUndefined()
    })
})
