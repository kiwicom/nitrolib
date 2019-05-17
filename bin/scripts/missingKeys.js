// @noflow
const fs = require("fs-extra");
const path = require("path");

function missingKeys(out, fKeys, fFiles) {
  const keys = fs.readJsonSync(fKeys);
  const files = fs.readJsonSync(fFiles);

  return Object.keys(files).reduce((acc, id) => {
    const locale = fs.readJsonSync(path.join(out, files[id]));

    return acc.concat(
      Object.keys(keys).reduce((acc2, key) => {
        if (!locale[key]) {
          return acc2.concat(`Locale ${id} has an untranslated key: ${key}`);
        }

        return acc2;
      }, []),
    );
  }, []);
}

module.exports = missingKeys;
