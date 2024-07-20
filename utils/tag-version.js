import inquirer from "inquirer";
import jsonfile from "jsonfile";
import simpleGit from "simple-git";

const file = "./package.json";

jsonfile.readFile(file, (err, packageObj) => {
  if (err) throw err;
  const currentVersion = packageObj.version;
  console.log(`Current version: ${currentVersion}`);

  inquirer
    .prompt([
      {
        type: "input",
        name: "newVersion",
        message: "Enter new version:",
      },
    ])
    .then((answers) => {
      const newVersion = answers.newVersion;
      packageObj.version = newVersion;

      jsonfile.writeFile(file, packageObj, { spaces: 2 }, (err) => {
        if (err) throw err;
        console.log(`Version will be updated to ${newVersion} AND RELEASED`);

        const git = simpleGit();
        git
          .add("./*")
          .commit(`Bump version to ${newVersion}`)
          .addTag(newVersion)
          .then(() => {
            console.log(`New git tag created locally: ${newVersion}`);
            return git.push("origin", "main");
          })
          .then(() => git.push("origin", newVersion))
          .then(() =>
            console.log(
              `Pushed main and new tag ${newVersion} to remote repository`
            )
          )
          .catch((err) => console.error("Failed to push changes", err));
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment");
      } else if (error.message.includes("User force closed the prompt")) {
        console.log("Operation cancelled.");
      } else {
        console.error("An error occurred:", error);
      }
    });
});
