import { defineConfig } from "vite";
import { modifyOutputPlugin } from "./modifyOutputPlugin";

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: "src/main.js",
      },
      output: {
        entryFileNames: "[name].js",
        preserveModulesRoot: "src",
        preserveModules: true,
      },
      preserveEntrySignatures: "strict",
      plugins: [modifyOutputPlugin()],
    },
  },
  plugins: [modifyOutputPlugin()],
});
