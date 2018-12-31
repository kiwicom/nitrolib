// @noflow
const R = require("ramda");

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
      R.mapObjIndexed(
        language =>
          R.assoc("continent", R.path([language.defaultCountry, "continent"], countries), language),
        R.filter(language => R.contains(language.id, enabledLanguageIds), languages),
      ),
    );

    return {
      defaultLocale: langs.default,
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
  R.over(
    R.lensProp("continents"),
    R.sortBy(continent => translations[tKeys[continent]]),
    brandLanguage,
  );

module.exports = {
  translateAndSortContinents,
  getBrandLanguages,
};
