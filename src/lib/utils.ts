import chalk from "chalk";
import figlet from "figlet";
import packageJson from "../../package.json";
import { Templates, TTemplates } from "./constants";
import select from "@inquirer/select";

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
  checkTemplate: async (template?: string): Promise<TTemplates> => {
    if (template && Object.keys(Templates).includes(template)) {
      return template as TTemplates;
    }

    let isValid = false;
    let testTemplate = "";

    while (!isValid) {
      testTemplate = await select({
        message: "\tSelect a mod template",
        choices: Object.keys(Templates).map((t) => ({
          name: t,
          value: t,
        })),
        default: "general",
      });

      if (!testTemplate || !Object.keys(Templates).includes(testTemplate)) {
        isValid = false;
        Utils.printErrorMsg(
          `This template ${chalk.bgRed.cyanBright(template)} does not exist. Please select a valid entry.`
        );
      } else {
        isValid = true;
      }
    }
    return testTemplate as TTemplates;
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
