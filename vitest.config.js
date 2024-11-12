import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        include: ['tests/**/*.test.js'],
        globals: true,
        setupFiles: 'tests/setup.js',
        reporters: 'dot',
    },
    resolve: {
        alias: {
          src: "/src/",
          public: "/public/"
        }
      }
})
