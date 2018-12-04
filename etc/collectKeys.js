// @noflow
const fs = require("fs-extra");
const path = require("path");

const collectKeys = require("../bin/scripts/collectKeys");

const OUT = path.join(__dirname, "../");
const SRC = path.join(__dirname, "../src");

const keys = collectKeys([`${SRC}/**/*.jsx`, `${SRC}/**/*.js`]);

fs.outputJsonSync(path.join(OUT, "tkeys.json"), keys, {
  spaces: 2,
});
