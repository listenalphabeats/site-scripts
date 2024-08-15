import inquirer from 'inquirer'
import jsonfile from 'jsonfile'
import fs from 'fs'
import simpleGit from 'simple-git'

const packageFile = './package.json'
const readmeFile = './README.md'

jsonfile.readFile(packageFile, (err, packageObj) => {
  if (err) throw err
  const currentVersion = packageObj.version
  console.log(`Current version: ${currentVersion}`)

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newVersion',
        message: 'Enter new version:',
      },
    ])
    .then(answers => {
      const newVersion = answers.newVersion
      packageObj.version = newVersion

      jsonfile.writeFile(packageFile, packageObj, { spaces: 2 }, err => {
        if (err) throw err
        console.log(`Version will be updated to ${newVersion} AND RELEASED`)

        if (fs.existsSync(readmeFile)) {
          fs.readFile(readmeFile, 'utf8', (err, data) => {
            if (err) throw err

            const updatedReadme = data.replace(
              /site-scripts@\d+\.\d+\.\d+/g,
              `site-scripts@${newVersion}`
            )

            fs.writeFile(readmeFile, updatedReadme, 'utf8', err => {
              if (err) throw err
              console.log(`README.md updated with new version ${newVersion}`)
            })
          })
        } else {
          console.log('README.md file not found, skipping README update.')
        }

        const git = simpleGit()
        git
          .add('./*')
          .commit(`Bump version to ${newVersion}`)
          .addTag(newVersion)
          .then(() => {
            console.log(`New git tag created locally: ${newVersion}`)
            return git.push('origin', 'main')
          })
          .then(() => git.push('origin', newVersion))
          .then(() =>
            console.log(
              `Pushed main and new tag ${newVersion} to remote repository`
            )
          )
          .catch(err => console.error('Failed to push changes', err))
      })
    })
    .catch(error => {
      if (error.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment")
      } else if (error.message.includes('User force closed the prompt')) {
        console.log('Operation cancelled.')
      } else {
        console.error('An error occurred:', error)
      }
    })
})
