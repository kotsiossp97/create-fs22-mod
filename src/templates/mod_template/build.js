const fs = require("fs");
const JSZip = require("jszip");
const path = require("path");

const zip = new JSZip();

const build = () => {
  const allFolders = fs.readdirSync(__dirname);
  const folders = allFolders.filter((dir) => {
    const stats = fs.statSync(path.join(__dirname, dir));
    if (stats.isDirectory() && dir.startsWith("FS22_")) {
      return true;
    }
  });

  const outDir = process.argv[2] ?? "build";
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  if (!folders.length) {
    process.exit(1);
  }
  const modFolder = folders[0];

  const zipfile = `${modFolder}.zip`;
  console.log(`Creating ${zipfile}...`);

  addFolderContentsToZip(modFolder);

  console.log("Storing...");

  zip
    .generateAsync({ type: "nodebuffer", compression: "STORE" })
    .then((contents) => {
      fs.writeFileSync(path.join(__dirname, outDir, zipfile), contents);
    });
  console.log("Done.");
};

const addFolderContentsToZip = (folderPath) => {
  const directory = fs.readdirSync(folderPath);
  process.chdir(path.join(__dirname, folderPath));
  directory.forEach((dir) => {
    addFile(dir);
  });
};

const addFile = (filepath) => {
  if (fs.lstatSync(filepath).isDirectory()) {
    console.log("  Adding folder", filepath);
    zip.folder(filepath);
    var directory = fs.readdirSync(filepath);
    directory.forEach(function (subfilepath) {
      addFile(path.join(filepath, subfilepath));
    });
  } else {
    console.log("  Adding file", filepath);
    zip.file(filepath, fs.readFileSync(filepath, "binary"));
  }
};

/* Main Flow */
build();
