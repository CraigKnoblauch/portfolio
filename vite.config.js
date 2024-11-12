// https://vite.dev/config/
import { defineConfig } from 'vite'

export default defineConfig({
    root: './',
    publicDir: './public/',
    base: './',
    build:
    {
        outDir: './dist',
        emptyOutDir: true,
        sourcemap: true
    }
})

