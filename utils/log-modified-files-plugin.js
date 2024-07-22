import simpleGit from "simple-git";
import path from "path";
import chalk from "chalk";
import jsonfile from "jsonfile";
import { getScriptString } from "./config";

const file = "./package.json";

export function logModifiedFiles() {
  return {
    name: "log-modified-files-plugin",
    configureServer(server) {
      server.httpServer.once("listening", async () => {
        const git = simpleGit();
        try {
          jsonfile.readFile(file, (err, packageObj) => {
            if (err) throw err;
            const currentVersion = packageObj.version;
            console.log(`\nCURRENT TAG VERSION ${currentVersion}\n`);
          });

          const status = await git.status();
          const modifiedFiles = status.modified.filter(
            (file) => file.startsWith("dist/") && file.endsWith(".js")
          );
          const newFiles = status.not_added.filter(
            (file) => file.startsWith("dist/") && file.endsWith(".js")
          );
          const deletedFiles = status.deleted.filter(
            (file) => file.startsWith("dist/") && file.endsWith(".js")
          );

          if (deletedFiles.length) {
            console.log(`\n`, chalk.red("DELETED:"));
            deletedFiles.forEach((file) => {
              const distPath = path.join(file);
              console.log(chalk.red(getScriptString("NEXT_TAG", distPath)));
            });
          }

          if (modifiedFiles.length) {
            console.log(`\n`, chalk.hex("#FFA500")("MODIFIED:"));
            modifiedFiles.forEach((file) => {
              const distPath = path.join(file);
              console.log(
                chalk.hex("#FFA500")(getScriptString("NEXT_TAG", distPath))
              );
            });
          }

          if (newFiles.length) {
            console.log(`\n`, chalk.green("NEW:"));
            newFiles.forEach((file) => {
              const distPath = path.join(file);
              console.log(chalk.green(getScriptString("NEXT_TAG", distPath)));
            });
          }
          console.log();
        } catch (error) {
          console.error("Error fetching git status:", error);
        }
      });
    },
  };
}
