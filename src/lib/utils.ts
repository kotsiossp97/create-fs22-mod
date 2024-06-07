import chalk from "chalk";
import validate from "validate-npm-package-name";
import figlet from "figlet";
import packageJson from "../../package.json";

export const Utils = {
  getProjectDetails: () => {
    return {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    };
  },
  printIntro: () => {
    const author = figlet.textSync("C Y S G");
    const proj = figlet.textSync("Create-FS22-Mod");

    console.log(chalk.bgBlack.yellow.bold(author));
    console.log(chalk.bgBlack.white.bold(proj));
    console.log();
  },
  checkAppName: (appName: string) => {
    // const validationResult = validate(appName);

    // if (!validationResult.validForNewPackages) {
    //   console.error(
    //     chalk.red(
    //       `❌\tCannot create a project named ${chalk.green(
    //         `"${appName}"`
    //       )} because of npm naming restrictions:\n`
    //     )
    //   );
    //   [
    //     ...(validationResult.errors || []),
    //     ...(validationResult.warnings || []),
    //   ].forEach((error) => {
    //     console.error(chalk.red(`  * ${error}`));
    //   });
    //   console.error(chalk.red("\nPlease choose a different project name."));
    //   process.exit(1);
    // }

    if (!appName.startsWith("FS22_")) {
      console.error(
        chalk.red(
          `❌\tCannot create a mod named ${chalk.green(
            `"${appName}"`
          )} because it needs to begin with:\n  * FS22_`
        )
      );
      console.error(chalk.red("\nPlease choose a different project name."));
      process.exit(1);
    }
  },

  printErrorMsg: (message: string = "") => {
    if (message === "") {
      console.log();
      console.error(`❌\t${chalk.red(`An error occured`)}`);
      console.log();
    } else {
      console.log();
      console.error(`❌\t${chalk.red(message)}`);
      console.log();
    }
  },
};
