import { Utils } from "./utils";
import commander from "commander";
import chalk from "chalk";
import path from "path";
import { existsSync, rmSync, ensureDirSync } from "fs-extra";
import { input } from "@inquirer/prompts";
import { createMod } from "./modCreation";
let projectName: string;

const init = async () => {
  const details = Utils.getProjectDetails();
  const program = new commander.Command(details.name)
    .version(details.version)
    .description(details.description)
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .action((name) => {
      projectName = name;
    })
    // .addOption(
    //   new commander.Option(
    //     "-t --template <template>",
    //     "template to be used"
    //   ).choices(availableTemplates)
    // )
    .parse(process.argv);

  Utils.printIntro();

  const currentDir = process.cwd();
  const root = path.resolve(projectName);
  const appName = path.basename(root);

  Utils.checkAppName(appName);

  try {
    await createFs22Mod(root, appName);
  } catch (e) {
    process.chdir(currentDir);
    rmSync(`./${appName}`, { recursive: true, force: true });
    Utils.printErrorMsg((e as Error).message);
  }

  process.exit(0); //no errors occurred
};
export default init;

const createFs22Mod = async (root: string, appName: string) => {
  if (existsSync(root)) {
    Utils.printErrorMsg(
      `A project with the name ${chalk.bgRed.cyanBright(appName)} already exists.`
    );

    appName = await input({
      message: "\tEnter a new FS22 mod name",
      default: "fs22_sample_mod",
    });
    root = path.join(root, "..", appName);

    if (existsSync(root)) {
      Utils.printErrorMsg(
        `A project with the name ${chalk.bgRed.cyanBright(appName)} also already exists, exiting!`
      );
      process.exit(1);
    }
  }
  ensureDirSync(root);

  process.chdir(root);

  try {
    await createMod(root, appName);
  } catch (e) {
    throw e;
  }

  console.log();
  console.log(`🆕\t${chalk.green("Created mod successfully, ")}`);
  console.log(
    `\n\tRun\n\t\t${chalk.cyan(`cd `)}${appName}\n\t\t${chalk.cyan(`code `)} .`
  );
  console.log(`\tto begin developing your mod!`);
  console.log();
};
