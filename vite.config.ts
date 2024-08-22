import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.ts',
      },
      output: {
        dir: 'dist',
        entryFileNames: 'bundle.js',
        format: 'iife',
        name: 'ab',
      },
      preserveEntrySignatures: 'strict',
    },
  },
  server: {
    port: 3000,
  },
})
