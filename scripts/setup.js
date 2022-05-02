// ~/scripts/setup.ts
// Sets up the project using this template for you.

import path from 'node:path'
import process from 'node:process'
import { readFile, writeFile, rm as deleteDirectory } from 'node:fs/promises'

import replace from 'replace-in-file'
import chalk from 'chalk'
import enquirer from 'enquirer'
import { execa } from 'execa'

const json = JSON

// Exit if we are in the CI environment
if (process.env.CI) {
	// Delete this script
	await deleteDirectory('./scripts/', {
		recursive: true,
		force: true,
	})

	process.exit(0) // eslint-disable-line unicorn/no-process-exit
}

// Some constants
const { stdout: gitUsername } = await execa('git', [
	'config',
	'--global',
	'--get',
	'user.name',
])
const currentDirectory = path.basename(process.cwd())
const sourceFiles = [
	'{source,test}/**/*.ts',
	'.github/**/*.{md,yaml}',
	'*.{md,json,yaml}',
]

// The text to replace
const { authorName, packageName, repository } = await enquirer.prompt([
	{
		type: 'input',
		name: 'authorName',
		message: 'Enter your full name',
		inital: gitUsername,
	},
	{
		type: 'input',
		name: 'packageName',
		message: 'Enter the package name',
		inital: currentDirectory,
	},
	{
		type: 'input',
		name: 'repository',
		message:
			'Enter the name of the repository on GitHub (in the format `username/repository-name`)',
	},
])

console.info(chalk.bold.cyan('\nSetting up your new project...'))

const replacements = [
	{
		from: /Vedant K/g,
		to: authorName,
	},
	{
		from: /gamemaker1\/typescript-template/g,
		to: repository,
	},
	{
		from: /typescript-template/g,
		to: packageName,
	},
]
// Replace it in all the files
for (const replacement of replacements)
	await replace({
		files: sourceFiles,
		...replacement,
	})

// Delete some stuff from `package.json`
const packageJson = json.parse(await readFile('./package.json'))
// Delete the setup script's dependencies in the `package.json` file
for (const setupDep of ['chalk', 'enquirer', 'execa', 'replace-in-file']) {
	delete packageJson.devDependencies[setupDep]
	await execa('pnpm', ['remove', setupDep])
}
// Also replace the `prepare` script with the actual version
packageJson.scripts.prepare = packageJson.scripts['actual-prepare']
// Delete the now-unneeded scripts
delete packageJson.scripts['actual-prepare']
// Now write this data back
await writeFile('./package.json', json.stringify(packageJson, undefined, '\t'))

// Initialize a git repository
await execa('git', ['init'])

// Print out we're done!
console.info(
	chalk.bold.green(
		'Done setting up! Now you can go write some amazing code :D\n',
	),
)

// Delete this script
await deleteDirectory('./scripts/', {
	recursive: true,
	force: true,
})
