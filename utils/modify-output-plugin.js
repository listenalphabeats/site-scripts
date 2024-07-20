export function modifyOutputPlugin() {
  return {
    name: "modify-output-plugin",
    generateBundle(_, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (fileName === "main.js") {
          delete bundle[fileName];
          return;
        }
        if (
          file.type === "chunk" &&
          fileName.includes(".js") &&
          typeof file.code === "string"
        ) {
          // Replace imports and exports from dist folder
          file.code = removeImportExports(file.code);
        }
      }
    },
  };
}

function removeImportExports(code) {
  const regexp = /import\s+.*?;\s*\n|export\s+{[^}]+};?\s*\n/g;
  return code.replace(regexp, "");
}
