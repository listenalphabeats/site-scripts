import { defineConfig } from 'vite'
import { modifyOutputPlugin } from './utils/modify-output-plugin'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.ts',
      },
      output: {
        dir: 'dist',
        entryFileNames: 'bundle.js',
        format: 'es',
      },
      preserveEntrySignatures: 'strict',
      plugins: [modifyOutputPlugin()],
    },
  },
  plugins: [modifyOutputPlugin()],
  server: {
    port: 3000,
  },
})
