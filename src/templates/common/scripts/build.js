const fs = require("fs");
const path = require("path");
const figlet = require("figlet");
const archiver = require("archiver");

const basePath = path.resolve(__dirname, "..");
const zip = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

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

  const zipfile = isBackup ? getBackupFileName(modFolder, outDir) : `${modFolder}.zip`;

  if (isBackup) {
    console.log(`ℹ️\tCreating backup zip file ${zipfile}...\n`);
  } else {
    console.log(`ℹ️\tCreating zip file ${zipfile}...\n`);
  }

  console.log("\nℹ️\tSaving...\n");
  const output = fs.createWriteStream(path.join(basePath, outDir, zipfile));

  // pipe archive data to the file
  zip.pipe(output);

  zip.on("error", (err) => {
    throw err;
  });

  console.log("  Adding contents of folder 📂\t", modFolder, " to zip file...\n");
  zip.directory(modFolder, false);
  zip.finalize();

  output.on("close", () => {
    console.log("✅\tDone.\n");
  });
};

const getBackupFileName = (modFolder, outDir) => {
  const outDirFiles = fs.readdirSync(outDir);
  let version = 1;
  while (true) {
    const exists = outDirFiles.filter((f) => f === `${modFolder}_bkp_v${version}.zip`).length > 0;
    if (!exists) break;
    version += 1;
  }

  return `${modFolder}_bkp_v${version}.zip`;
};

/* Main Flow */
build();
