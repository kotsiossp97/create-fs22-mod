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
    "FarmingSimulator2022",
  );

  if (!fs.existsSync(fs22Dir)) {
    console.error(
      "❌\tThe path\n\tDocuments\\My Games\\FarmingSimulator22\ndoes not exist.\nAre you sure that the game is installed on your system?",
    );
    process.exit(-1);
  }

  const modsFolder = path.join(fs22Dir, "mods");

  if (!fs.existsSync(modsFolder)) {
    console.info(
      "ℹ️\t Mods folder was not found, attempting to create the folder",
    );
    fs.mkdirSync(modsFolder);
  }

  return modsFolder;
};

const getModFolder = () => {
  const currPath = path.resolve(__dirname, "..");
  const files = fs.readdirSync(currPath);
  const modFolder = files.filter((f) => f.startsWith("FS22_"));
  if (modFolder.length === 0) {
    console.error("❌\tNo mod folder found in the current directory.");
    process.exit(-1);
  }
  const folder = modFolder[0];
  return [folder, path.join(currPath, folder)];
};

const main = () => {
  console.log(figlet.textSync("CYSG"));
  checkOs();
  const modsDir = findFsModsDir();
  console.log("ℹ️\tFarming Simulator 22 mods directory found.\n");
  const [modName, folderPath] = getModFolder();
  console.log(`ℹ️\tMoving folder ${modName} to FS22 mods directory.\n`);
  const destination = path.join(modsDir, modName);

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  fs.cpSync(folderPath, destination, { recursive: true });
  //   fs.copyFileSync(zipFilePath, destination);
  console.log(`✅\tDone, moved successfully\n`);
};

/* Main Flow */
main();
