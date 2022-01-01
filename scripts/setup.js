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
	await deleteDirectory('./scripts', {
		recursive: true,
		force: true,
	})

	process.exit(0)
}

// The files to replace stuff in
const sourceFiles = [
	'{source,test}/**/*.ts',
	'.github/**/*.{md,yaml}',
	'*.{md,json,yaml}',
]
// Get the data we need
const { authorName, packageName, repository } = await enquirer.prompt([
	{
		type: 'input',
		name: 'authorName',
		message: 'Enter your full name',
		inital: (
			await execa('git', ['config', '--global', '--get', 'user.name'])
		).stdout,
	},
	{
		type: 'input',
		name: 'packageName',
		message: 'Enter the package name',
		inital: path.basename(process.cwd()),
	},
	{
		type: 'input',
		name: 'repository',
		message:
			'Enter the name of the repository on GitHub (in the format `username/repository-name`)',
	},
])
// Replace it in all the files
for (const fromTo of [
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
])
	await replace({
		files: sourceFiles,
		...fromTo,
	})

// Delete some stuff from `package.json`
const packageJson = json.parse(await readFile('./package.json'))
// Delete the setup script's dependencies in the `package.json` file
for (const setupDep of ['chalk', 'enquirer', 'execa', 'replace-in-file'])
	delete packageJson.devDependencies[setupDep]
// Also replace the `prepare` script with the actual version
delete packageJson.scripts.setup
packageJson.scripts.prepare = packageJson.scripts['actual-prepare']
delete packageJson.scripts['actual-prepare']
// Now write this data back
await writeFile('./package.json', json.stringify(packageJson, undefined, '\t'))

// Re-run `pnpm install`
await execa('pnpm', ['install'])

// Print out we're done!
console.info(
	chalk.bold.green(
		'\nDone setting up! Now you can go write some amazing code :D\n'
	)
)

// Delete this script
await deleteDirectory('./scripts', {
	recursive: true,
	force: true,
})
