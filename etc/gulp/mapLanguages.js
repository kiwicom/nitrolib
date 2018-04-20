// @flow strict
const fs = require("fs-extra");
const path = require("path");
const R = require("ramda");

const OUT = path.join(__dirname, "../../data/");

const getEnabledLanguageIds = R.compose(R.keys, R.filter(R.prop("enabled")));

const sortObjectByName = R.compose(
  R.fromPairs,
  R.sortBy(R.pipe(R.nth(1), R.prop("name"))),
  R.toPairs,
);

const getBrandLanguages = (brands, languages, countries) =>
  R.map(brand => {
    const { default: defaultLocale, locales } = brand.localization.languages;
    const enabledLanguageIds = getEnabledLanguageIds(locales);
    const enabledLanguages = sortObjectByName(
      R.map(
        language =>
          R.assoc("continent", R.path([language.defaultCountry, "continent"], countries), language),
        R.filter(language => R.contains(language.id, enabledLanguageIds), languages),
      ),
    );

    return {
      default: defaultLocale,
      languages: enabledLanguages,
      continents: R.uniq(R.unnest(R.pluck("continent", R.values(enabledLanguages)))),
    };
  }, brands);

const mapLanguages = () =>
  Promise.all([
    fs.readJson(path.join(OUT, "brands.json")),
    fs.readJson(path.join(OUT, "languages.json")),
    fs.readJson(path.join(OUT, "countries.json")),
  ]).then(([brands, languages, countries]) =>
    fs.outputJson(
      path.join(OUT, "brandLanguages.json"),
      getBrandLanguages(
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
      ),
      {
        spaces: 2,
      },
    ),
  );

module.exports = mapLanguages;
