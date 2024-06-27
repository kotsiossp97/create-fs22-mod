const fs = require("fs");
const path = require("path");
const os = require("os");
const figlet = require("figlet");

const checkOs = () => {
  if (!os.platform().startsWith("win")) {
    console.warn("❗\tThis operation is only supported on Windows systems.");
    process.exit();
  }
};

const findFsModsDir = () => {
  const fs22Dir = path.join(
    os.homedir(),
    "Documents",
    "My Games",
    "FarmingSimulator2022"
  );

  if (!fs.existsSync(fs22Dir)) {
    console.error(
      "❌\tThe path\n\tDocuments\\My Games\\FarmingSimulator22\ndoes not exist.\nAre you sure that the game is installed on your system?"
    );
    process.exit(-1);
  }

  const modsFolder = path.join(fs22Dir, "mods");

  if (!fs.existsSync(modsFolder)) {
    console.info(
      "ℹ️\t Mods folder was not found, attempting to create the folder"
    );
    fs.mkdirSync(modsFolder);
  }

  return modsFolder;
};

const getZipPathFromBuild = () => {
  const build = path.resolve(__dirname, "..", "build");
  if (!fs.existsSync(build)) {
    console.error("❌\tNo build folder found in your project.");
    console.info(
      "\tTry running\tnpm run build\tto create the zip file first.\n"
    );
    process.exit(-1);
  }
  const files = fs.readdirSync(build);
  const FS22Files = files.filter(
    (f) => f.startsWith("FS22_") && !f.includes("_bkp_v") && f.endsWith(".zip")
  );

  if (!FS22Files.length) {
    console.error("❌\tNo valid zip file found in the build folder.");
    console.info("\tTry running");
    console.info("\t\tnpm run clear\t");
    console.info("\t\tnpm run build\t");
    console.info("\tto create the zip file first.\n");
    process.exit(-1);
  }
  return [FS22Files[0], path.join(build, FS22Files[0])];
};

const main = () => {
  console.log(figlet.textSync("CYSG"));
  checkOs();
  const modsDir = findFsModsDir();
  console.log("ℹ️\tFarming Simulator 22 mods directory found.\n");
  const [zipFileName, zipFilePath] = getZipPathFromBuild();
  console.log(`ℹ️\tMoving file ${zipFileName} to FS22 mods directory.\n`);
  const destination = path.join(modsDir, zipFileName);

  fs.copyFileSync(zipFilePath, destination);
  console.log(`✅\tDone, moved successfully\n`);
};

/* Main Flow */
main();
