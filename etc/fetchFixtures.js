const fs = require("fs-extra");
const path = require("path");
const R = require("ramda");

const DATA = path.join(__dirname, "../data");
const FIXTURES = path.join(__dirname, "../stories/fixtures");

const LANG_WHITELIST = {
  en: true,
  ru: true,
  ja: true,
  it: true,
  sk: true,
  cz: true,
  es: true,
  cn: true,
  ar: true,
  el: true,
  il: true,
};

const languages = fs.readJsonSync(path.join(DATA, "languages.json"));

// Translations
const translationsFiles = fs.readJsonSync(path.join(DATA, "translationsFiles.json"));
const translations = Object.keys(languages)
  .filter(lang => LANG_WHITELIST[lang])
  .map(lang => languages[lang].phraseApp)
  .reduce(
    (acc, key) =>
      Object.assign({}, acc, {
        [key]: fs.readJsonSync(path.join(DATA, translationsFiles[key])),
      }),
    {},
  );

fs.outputJsonSync(path.join(FIXTURES, "translations.json"), translations, {
  spaces: 2,
});

// Brand languages
const filterLangs = obj =>
  R.compose(
    R.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {}),
    R.filter(lang => LANG_WHITELIST[lang]),
    R.keys,
  )(obj);

const brandLanguagesFiltered = R.map(
  filterLangs,
  fs.readJsonSync(path.join(DATA, "brandLanguages.json")),
);
fs.outputJsonSync(path.join(FIXTURES, "brandLanguages.json"), brandLanguagesFiltered, {
  spaces: 2,
});

// Languages
const languagesFiltered = filterLangs(fs.readJsonSync(path.join(DATA, "languages.json")));
fs.outputJsonSync(path.join(FIXTURES, "languages.json"), languagesFiltered, {
  spaces: 2,
});

// ...rest
const rest = ["brands.json", "continents.json", "countries.json", "airlines.json"];

rest.forEach(file => {
  fs.outputJsonSync(path.join(FIXTURES, file), fs.readJsonSync(path.join(DATA, file)), {
    spaces: 2,
  });
});
