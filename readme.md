<!--
	~/readme.md
	Tells the users what this project is, how they can use it and how they can ask questions/contribute.
-->

# <div align="center"> Opiniated Typescript + ESM Template </div>

<div align="center">
	<img alt="Github Workflow Status" src="https://img.shields.io/github/workflow/status/gamemaker1/typescript-template/CI"/>
	<img alt="GitHub Stars" src="https://img.shields.io/github/stars/gamemaker1/typescript-template"/>
</div>

## What Is This?

An opiniated template for Typescript + ESM projects.

It includes:

- [`typescript`](https://www.typescriptlang.org/) +
  [`esm`](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) for
  writing code (compiles to esm for `node` 14+).
- [`esbuild`](https://esbuild.github.io/) +
  [`dts-bundle-generator`](https://github.com/timocov/dts-bundle-generator#readme)
  for blazing fast builds.
- [`jest`](https://jestjs.io/) for testing.
- [`xo`](https://github.com/xojs/xo#readme) + [`prettier`](https://prettier.io/)
  for linting and formatting.
- [`husky`](https://typicode.github.io/husky/#/) +
  [`lint-staged`](https://github.com/okonet/lint-staged#readme) for linting
  staged files before committing them.
- [`pnpm`](https://pnpm.io/) for fast and efficient package management.
- a [`contributing.md`](./contributing.md), [`changelog.md`](./changelog.md),
  [`license.md`](./license.md) and [`readme.md`](./readme.md) file.

## How Do I Use It?

To use this template, `degit` it:

```
$ mkdir <project-name>
$ pnpx degit gamemaker1/typescript-template
$ pnpm install
```

Answer a couple of questions as part of the setup process, and get coding!

## License

You can use this template for any project! The `license.md` file in this
repository IS NOT the license for this template - it is part of the template,
and you can change it as you wish.
