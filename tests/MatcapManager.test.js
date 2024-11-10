import { it, expect, describe } from 'vitest'
import MatcapManager from '../src/MatcapManager'

describe('MatcapManager', () => {
    it('Should be a singleton', () => {
        const mm1 = new MatcapManager()
        const mm2 = new MatcapManager()
        expect(mm1).toBe(mm2)
    })
})