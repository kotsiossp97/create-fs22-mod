const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const figlet = require("figlet");

const zip = new JSZip();
const basePath = path.resolve(__dirname, "..");

const build = () => {
  const allFolders = fs.readdirSync(basePath);
  const folders = allFolders.filter((dir) => {
    const stats = fs.statSync(path.join(basePath, dir));
    if (stats.isDirectory() && dir.startsWith("FS22_")) {
      return true;
    }
  });

  const outDir = process.argv[2] ?? "build";
  const isBackup = process.argv[3] === "backup" ?? false;

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  console.log(figlet.textSync("CYSG"));
  if (!folders.length) {
    console.error("❌\tNo mod folder found, starting with FS22_ prefix");
    process.exit(1);
  }
  const modFolder = folders[0];

  const zipfile = isBackup
    ? getBackupFileName(modFolder, outDir)
    : `${modFolder}.zip`;

  if (isBackup) {
    console.log(`ℹ️\tCreating backup zip file ${zipfile}...\n`);
  } else {
    console.log(`ℹ️\tCreating zip file ${zipfile}...\n`);
  }
  addFolderContentsToZip(modFolder);

  console.log("\nℹ️\tSaving...\n");

  zip
    .generateAsync({ type: "nodebuffer", compression: "DEFLATE" })
    .then((contents) => {
      fs.writeFileSync(path.join(basePath, outDir, zipfile), contents);
      console.log("✅\tDone.\n");
    });
};

const getBackupFileName = (modFolder, outDir) => {
  const outDirFiles = fs.readdirSync(outDir);
  let version = 1;
  while (true) {
    const exists =
      outDirFiles.filter((f) => f === `${modFolder}_bkp_v${version}.zip`)
        .length > 0;
    if (!exists) break;
    version += 1;
  }

  return `${modFolder}_bkp_v${version}.zip`;
};

const addFolderContentsToZip = (folderPath) => {
  const directory = fs.readdirSync(folderPath);
  process.chdir(path.join(basePath, folderPath));
  directory.forEach((dir) => {
    addFile(dir);
  });
};

const addFile = (filepath) => {
  if (fs.lstatSync(filepath).isDirectory()) {
    console.log("  Adding folder 📂:\t", filepath);
    zip.folder(filepath);
    var directory = fs.readdirSync(filepath);
    directory.forEach(function (subfilepath) {
      addFile(path.join(filepath, subfilepath));
    });
  } else {
    console.log("  Adding file   🗒️:\t", filepath);
    zip.file(filepath, fs.readFileSync(filepath));
  }
};

/* Main Flow */
build();
