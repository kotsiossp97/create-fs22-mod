const os = require("os");
const figlet = require("figlet");

const checkOs = () => {
  if (!os.platform().startsWith("win")) {
    console.warn("❗\tThis operation is only supported on Windows systems.");
    process.exit();
  }
};

const main = async () => {
  console.log(figlet.textSync("CYSG"));
  checkOs();
  const { default: open } = await import("open");
  console.log(`ℹ️\tLaunching Farming Simulator 22...\n`);
  const command = "steam://rungameid/1248130";

  open(command);
};

/* Main Flow */
main();
