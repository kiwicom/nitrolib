// @flow
const path = require("path");
const fs = require("fs-extra");
const { extractFromFiles } = require("i18n-extract");

const OUT = path.join(__dirname, "../../data");
const SRC = path.join(__dirname, "../../src");

async function collectKeys() {
  const keys = extractFromFiles([`${SRC}/**/*.jsx`, `${SRC}/**/*.js`], {
    marker: "__",
  });

  const mapped = keys.reduce(
    (acc, key) =>
      Object.assign({}, acc, {
        [key.key]: "",
      }),
    {},
  );

  fs.outputJsonSync(path.join(OUT, "tkeys.json"), mapped, {
    spaces: 2,
  });
}

module.exports = collectKeys;
