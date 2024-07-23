import path from "path";
import fs from "fs";

const getScriptString = (filePath) =>
  `<script defer src="http://localhost:3000/${filePath}"></script>`;

const readFilesRecursively = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      readFilesRecursively(filePath, fileList);
    } else if (file.endsWith(".js")) {
      fileList.push(filePath);
    }
  });
  return fileList;
};

export function logDistFilesPlugin() {
  return {
    name: "log-dist-files-plugin",
    configureServer(server) {
      server.httpServer.once("listening", () => {
        try {
          const distDir = path.resolve(__dirname, "../dist");
          const distFiles = readFilesRecursively(distDir);
          distFiles.forEach((file) => {
            const relativePath = path.relative(
              path.resolve(__dirname, "../"),
              file
            );
            console.log(getScriptString(relativePath));
          });
          console.log();
        } catch (error) {
          console.error("Error reading dist directory:", error);
        }
      });
    },
  };
}
