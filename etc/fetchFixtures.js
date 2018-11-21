const fs = require("fs-extra");
const path = require("path");

const DATA = path.join(__dirname, "../data");
const FIXTURES = path.join(__dirname, "../stories/fixtures");

// Translations
const translationsFiles = fs.readJsonSync(path.join(DATA, "translationsFiles.json"));
const translations = Object.keys(translationsFiles).reduce(
  (acc, key) =>
    Object.assign({}, acc, {
      [key]: fs.readJsonSync(path.join(DATA, translationsFiles[key])),
    }),
  {},
);

fs.outputJsonSync(path.join(FIXTURES, "translations.json"), translations, {
  spaces: 2,
});

// ...rest
const rest = [
  "brandLanguages.json",
  "brands.json",
  "continents.json",
  "countries.json",
  "languages.json",
  "airlines.json",
];

rest.forEach(file => {
  fs.outputJsonSync(path.join(FIXTURES, file), fs.readJsonSync(path.join(DATA, file)), {
    spaces: 2,
  });
});
