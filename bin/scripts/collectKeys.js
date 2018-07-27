// @flow
const { extractFromFiles } = require("i18n-extract");

function collectKeys(globs) {
  const keys = extractFromFiles(globs, {
    marker: "__",
  });

  const mapped = keys.reduce(
    (acc, key) =>
      Object.assign({}, acc, {
        [key.key]: true,
      }),
    {},
  );

  return mapped;
}

module.exports = collectKeys;
