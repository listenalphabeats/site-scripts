import { defineConfig } from "vite";
import { modifyOutputPlugin } from "./utils/modify-output-plugin";
import { logDistFilesPlugin } from "./utils/log-dist-files-plugin";

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
  plugins: [modifyOutputPlugin(), logDistFilesPlugin()],
  server: {
    port: 3000,
  },
});
