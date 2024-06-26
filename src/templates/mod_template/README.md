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

| Command                | Functionality                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`        | Zips and output the mod in the `build` folder                                                                                                                          |
| `npm run backup`       | Automatically creates a backup of the mod in a zip file, adding a \_v1, \_v2 postfix in the file name                                                                  |
| `npm run fs:move`      | **_Windows Only_**: Finds the builded zip file from the `build` folder (excluding the backups) and automatically moves it to the FS22 mods folder.                     |
| `npm run fs:moveFiles` | **_Windows Only_**: Moves the whole mod folder to the FS22 mods folder without zipping, for easily make changes and reflect them in the game.                          |
| `npm run fs:run`       | **_Windows Only_** **_Beta_**: Launches FS22 game from Steam. This only works if you have the game in Steam.                                                           |
| `npm run fs:test`      | **_Beta_**: This executes the operations of `npm run fs:move` and `npm run fs:run`. Effectively it moves the zip to mods folder and launches the game.                 |
| `npm run fs:testFiles` | **_Beta_**: This executes the operations of `npm run fs:moveFiles` and `npm run fs:run`. Effectively it moves the working folder to mods folder and launches the game. |
| `npm run clear`        | **_Use with Caution_**: Clears all the zipped files in the `build` folder, be aware, you might lose your backups.                                                      |
