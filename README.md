# create-fs22-mod

This is a CLI tool that creates a skeleton for a Farming Simulator mod project. The project includes a build command for automating the zipping of the mod to use it in the game.

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
