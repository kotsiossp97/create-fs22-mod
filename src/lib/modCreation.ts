import chalk from "chalk";
import path from "path";
import { Constants, Templates, TTemplates } from "./constants";
import { copySync, rmSync } from "fs-extra";
import { spawn } from "child_process";
import { Utils } from "./utils";
import { renameSync } from "fs";

export const createMod = async (
  root: string,
  appName: string,
  modTemplate: TTemplates
) => {
  console.log();
  console.log(
    `➡️\tCreating new FS22 Mod ${chalk.cyanBright(
      appName
    )} with template ${chalk.blueBright(modTemplate)} in ${chalk.green(root)}.`
  );
  console.log();

  const templateFolder = Templates[modTemplate];

  const templateDir = path.join(
    __dirname,
    "..",
    Constants.TEMPLATES_FOLDER,
    templateFolder
  );

  copySync(templateDir, root);

  const commonDir = path.join(
    __dirname,
    "..",
    Constants.TEMPLATES_FOLDER,
    Constants.COMMON_TEMPL_FOLDER
  );

  copySync(commonDir, root);

  renameSync("FS22_sample_mod", appName);

  console.log();
  console.log(
    `✅\t${chalk.green("Created file/folder structure successfully")}`
  );
  console.log();

  try {
    await install();
  } catch (e: any) {
    process.chdir("..");
    rmSync(`./${appName}`, { recursive: true, force: true });
    Utils.printErrorMsg(`Error executing command: ${e.command}`);
    process.exit(1);
  }
};

const install = () => {
  return new Promise<void>((resolve, reject) => {
    const command = /^win/.test(process.platform) ? "npm.cmd" : "npm";

    const args = ["install", "--save"];
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`,
        });
        return;
      }
      resolve();
    });
  });
};
