import '@testing-library/jest-dom/vitest'
import 'vitest-canvas-mock'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
