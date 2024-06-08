# Sample Mod Template for FS22

This is a mod skeleton for Farming Simulator 22, where you can begin developing your creation.

- Provides a modDesc file with minimum configuration
- Common folder structure of the mod

## Requirements

- Node installed on your system

## How to use

- Develop your mod in the folder starting with `FS22_`
- Use the available commands to make the development easier.

## Commands

| Command           | Functionality                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`   | Zips and output the mod in the `build` folder                                                                                                      |
| `npm run backup`  | Automatically creates a backup of the mod in a zip file, adding a \_v1, \_v2 postfix in the file name                                              |
| `npm run fs:move` | **_Windows Only_**: Finds the builded zip file from the `build` folder (excluding the backups) and automatically moves it to the FS22 mods folder. |
| `npm run clear`   | **_Use with Caution_**: Clears all the zipped files in the `build` folder, be aware, you might lose your backups.                                  |
