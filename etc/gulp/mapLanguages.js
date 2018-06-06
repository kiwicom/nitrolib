// @flow strict
const fs = require("fs-extra");
const path = require("path");
const R = require("ramda");

const OUT = path.join(__dirname, "../../data/");

const getEnabledLanguageIds = R.compose(
  R.keys,
  R.filter(R.prop("enabled")),
);

const sortObjectByName = R.compose(
  R.fromPairs,
  R.sortBy(
    R.pipe(
      R.nth(1),
      R.prop("name"),
    ),
  ),
  R.toPairs,
);

const getBrandLanguages = (brands, languages, countries) =>
  R.map(brand => {
    const langs = brand.localization.languages;
    const enabledLanguageIds = getEnabledLanguageIds(langs.locales);
    const enabledLanguages = sortObjectByName(
      R.map(
        language =>
          R.assoc("continent", R.path([language.defaultCountry, "continent"], countries), language),
        R.filter(language => R.contains(language.id, enabledLanguageIds), languages),
      ),
    );

    return {
      defaultLocale: langs.defaultLocale,
      languages: enabledLanguages,
      continents: R.uniq(R.unnest(R.pluck("continent", R.values(enabledLanguages)))),
    };
  }, brands);

const tKeys = {
  aas: "common.continents.aas",
  ap: "common.continents.ap",
  eu: "common.continents.eu",
  mea: "common.continents.mea",
};

const translateAndSortContinents = (brandLanguage, translations) =>
  R.assoc(
    "continents",
    R.compose(
      R.map(R.prop("id")),
      R.sortBy(
        R.prop("name"),
        brandLanguage.continents.map(continent => ({
          id: continent,
          name: translations[tKeys[continent]],
        })),
      ),
    ),
    brandLanguage,
  );

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

    const brandLangs = getBrandLanguages(
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
        R.map(translations => translateAndSortContinents(brandLang, translations), locales),
      brandLangs,
    );

    return fs.outputJson(path.join(OUT, "brandLanguages.json"), data, {
      spaces: 2,
    });
  });

module.exports = mapLanguages;
