// https://vite.dev/config/
import { defineConfig } from 'vite'
import path from 'path'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env
export default defineConfig({
    root: 'src/',
    publicDir: '../public',
    base: './',
    server: {
        host: true,
        open: !isCodeSandbox
    },
    build:
    {
        outDir: './dist',
        emptyOutDir: true,
        sourcemap: true
    },
    test: {
        include: ['../tests/**/*.test.js'],
        browser: {
            provider: 'playwright', // 'webdriverio' | 'playwright'
            enabled: true,
            name: 'chromium', // browser name is required
            headless: true, // overridden in CLI
            viewport: { width: 800, height: 600 },
            providerOptions: {}
        }
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
        }
    },
    allowOnly: true,
    maxConcurrency: 1,
    minWorkers: 1,
    testTimeout: 5000,
    restoreMocks: true,
    sequence: {
      concurrent: false
    }
    /**
     * For the future, you can use resolve and alias to make your paths in your
     * source files work out. For reference:

  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      lib: path.resolve(__dirname, './src/lib'),
      scenarios: path.resolve(__dirname, './src/scenarios'),
      testutils: path.resolve(__dirname, './src/tests/testutils')
    },
     */
})

