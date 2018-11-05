// @noflow
const fs = require("fs-extra");
const path = require("path");
const R = require("ramda");

const languageUtils = require("./utils/languages");

const OUT = path.join(process.cwd(), "data");

const mapLanguages = () =>
  Promise.all([
    fs.readJson(path.join(OUT, "brands.json")),
    fs.readJson(path.join(OUT, "languages.json")),
    fs.readJson(path.join(OUT, "countries.json")),
    fs.readJson(path.join(OUT, "translationsFiles.json")),
  ]).then(([brands, languages, countries, tFiles]) => {
    const locales = R.map(
      lang => fs.readJsonSync(path.join(OUT, tFiles[lang.phraseApp])),
      languages,
    );

    const brandLangs = languageUtils.getBrandLanguages(
      brands,
      R.map(
        language => ({
          id: language.id,
          name: language.displayName,
          flag: language.flag || language.id,
          defaultCountry: language.defaultCountry,
        }),
        languages,
      ),
      countries,
    );

    // TODO extract the whole R.map here and test it
    const data = R.map(
      brandLang =>
        R.map(
          translations => languageUtils.translateAndSortContinents(brandLang, translations),
          locales,
        ),
      brandLangs,
    );

    return fs.outputJson(path.join(OUT, "brandLanguages.json"), data, {
      spaces: 2,
    });
  });

module.exports = mapLanguages;
