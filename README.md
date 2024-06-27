<div align="center">
<img src="https://img.shields.io/github/actions/workflow/status/kotsiossp97/create-fs22-mod/release.yml?style=for-the-badge&label=GitHub%20Release&labelColor=black" />
<img style="margin-left: 10px" src="https://img.shields.io/github/actions/workflow/status/kotsiossp97/create-fs22-mod/npmPublish.yml?style=for-the-badge&label=NPM%20Release&labelColor=black" />
<img style="margin-left: 10px" src="https://img.shields.io/github/v/release/kotsiossp97/create-fs22-mod?style=for-the-badge&label=Version&labelColor=black" />
</div>

# create-fs22-mod

This is a CLI tool that creates a skeleton for a Farming Simulator mod project. The project includes a build command for automating the zipping of the mod to use it in the game.

## Features

- Scaffold your FS22 mod project into seconds
- The provided template is bundled with some useful commands for making the developing of the mod easier.
  Refer to the available commands in the template [Readme File](src/templates/mod_template/README.md#commands)

## Usage

- Navigate to your preferred directory
- Run the command to generate a new mod project:

```bash
npx create-fs22-mod <FS22_modName>
```

`Note that the project name must start with "FS22_", as per the ModHub standards.`

## Requirements

You need to have NodeJS installed on your system, see the [Official Page](https://nodejs.org/en) to download it.

## Manual Installation

In case that the package is not available from the [npm registry](https://www.npmjs.com/package/create-fs22-mod), use the following method to install it:

- Clone the repo

```bash
git clone https://github.com/kotsiossp97/create-fs22-mod
```

```bash
cd create-fs22-mod
```

- Install Dependencies

```bash
npm ci
```

- Build the project

```bash
npm run build
```

- Install the package globally

```bash
npm install -g .
```

- Use the command as normally

```bash
npx create-fs22-mod <FS22_modName>
```

## Future Features

- [ ] Add additional templates for various mod types, e.g Vehicle/Implement, Script, Placeable etc.
- [ ] Add more commands to the templates for making more tasks easier.
- [x] ~Add formatter plugin to templates (prettier) to make xml and lua files formatting consistent.~ Done
