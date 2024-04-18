import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
// Added glsl() on recomendation to resolve syntax error on glsl import: https://www.reddit.com/r/threejs/comments/10q4cnl/shader_file_throws_error_unexpected_token/?rdt=60672
export default defineConfig({
  plugins: [react(), glsl()],
})
