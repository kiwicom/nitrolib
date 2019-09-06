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

const mapLanguagesGran = () => {
  // read all folders
  const allBrands = fs.readdirSync(path.join(OUT, "brands"), (_, file) => file);
  const allLanguages = fs.readdirSync(path.join(OUT, "languages"), (_, file) => file);
  const allCountries = fs.readdirSync(path.join(OUT, "countries"), (_, file) => file);
  const allTranslations = fs.readJson(path.join(OUT, "translationsFiles.json"));

  Promise.all([allBrands, allLanguages, allCountries, allTranslations]).then(
    ([brands, languages, countries, tFiles]) => {
      const withIds = R.reduce(
        (acc, { id, ...rest }) => R.merge(acc, { [id]: { id, ...rest } }),
        {},
      );

      const getBrands = R.compose(
        withIds,
        R.map(brand => fs.readJsonSync(path.join(OUT, "brands", brand))),
      )(brands);

      const getLanguages = R.compose(
        withIds,
        R.map(lang => fs.readJsonSync(path.join(OUT, "languages", lang))),
      )(languages);

      const getCountries = R.compose(
        withIds,
        R.map(country => fs.readJsonSync(path.join(OUT, "countries", country))),
      )(countries);

      const locales = R.map(ln => fs.readJsonSync(path.join(OUT, tFiles[ln.phraseApp])))(
        getLanguages,
      );

      const brandLangs = languageUtils.getBrandLanguages(
        getBrands,
        R.map(
          language => ({
            id: language.id,
            name: language.displayName,
            flag: language.flag || language.id,
            defaultCountry: language.defaultCountry,
          }),
          getLanguages,
        ),
        getCountries,
      );

      const data = R.map(
        brandLang =>
          R.map(
            translations => languageUtils.translateAndSortContinents(brandLang, translations),
            locales,
          ),
        brandLangs,
      );

      return R.compose(
        R.map(item =>
          fs.outputJsonSync(path.join(OUT, "brandLanguages", item, `${item}.json`), data[item], {
            spaces: 2,
          }),
        ),
        R.keys,
      )(data);
    },
  );
};

module.exports = {
  mapLanguages,
  mapLanguagesGran,
};
