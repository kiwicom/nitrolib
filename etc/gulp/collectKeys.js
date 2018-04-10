// @flow
const path = require("path");
const fs = require("fs-extra");
const { extractFromFiles } = require("i18n-extract");

const OUT = path.join(__dirname, "../../data");

async function collectKeys() {
  const keys = extractFromFiles(["../../src/**/*.jsx", "../../src/**/*.js"], {
    marker: "__",
  });

  const mapped = keys.reduce(
    (acc, key) =>
      Object.assign({}, acc, {
        [key.key]: "",
      }),
    {},
  );

  fs.outputJsonSync(path.join(OUT, "tkeys.json"), mapped);
}

module.exports = collectKeys;
