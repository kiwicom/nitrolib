// @noflow
const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const R = require("ramda");

const OUT = path.join(process.cwd(), "data");
const LANGS = path.join(OUT, "languages.json");

const makeFilename = (locale, hash) => `translations/${locale}_${hash}.json`;

const getLocale = (locale, folder) /* : Promise<Intl> */ =>
  Promise.resolve({
    locale,
    translations: fs.readJsonSync(path.join(folder, `${locale}.json`)),
  });

function getTranslations(keys, folder) /* : Promise<void> */ {
  if (!fs.existsSync(LANGS)) {
    return Promise.reject(new Error("Translations require fetching 'data/languages.json'!"));
  }

  const langs = fs.readJsonSync(LANGS);
  const tkeys = fs.readJsonSync(keys);

  return Promise.all(
    R.map(
      lang =>
        getLocale(lang.phraseApp, folder).then(({ translations, locale }) => {
          const filtered = R.mapObjIndexed((_, key) => R.prop(key, translations), tkeys);
          const hash = crypto
            .createHash("sha1")
            .update(JSON.stringify(filtered, null, 2), "binary")
            .digest("hex");

          // SIDE EFFECT
          fs.outputJsonSync(path.join(OUT, makeFilename(locale, hash)), filtered, {
            spaces: 2,
          });

          return { locale, hash };
        }),
      R.values(langs),
    ),
  ).then(all => {
    const summary = all.reduce(
      (acc, next) =>
        Object.assign({}, acc, {
          [next.locale]: makeFilename(next.locale, next.hash),
        }),
      {},
    );

    fs.outputJsonSync(path.join(OUT, "translationsFiles.json"), summary, {
      spaces: 2,
    });
  });
}

function getTranslationsGranular(keys, folder) /* : Promise<void> */ {
  const tkeys = fs.readJsonSync(keys);

  const LANGS_GRAN_DIR = path.join(OUT, "languages");

  const LANGS_GRANULAR = fs.readdirSync(LANGS_GRAN_DIR, (err, files) => {
    if (err) {
      return console.log(`error: ${err}`);
    }

    return files;
  });

  const granularLangs = R.compose(
    R.map(lang =>
      getLocale(lang.phraseApp, folder).then(({ translations, locale }) => {
        const filtered = R.mapObjIndexed((_, key) => R.prop(key, translations), tkeys);
        const hash = crypto
          .createHash("sha1")
          .update(JSON.stringify(filtered, null, 2), "binary")
          .digest("hex");

        // SIDE EFFECT
        fs.outputJsonSync(path.join(OUT, makeFilename(locale, hash)), filtered, {
          spaces: 2,
        });

        return { locale, hash };
      }),
    ),
    R.map(item => fs.readJsonSync(path.join(LANGS_GRAN_DIR, item))),
  )(LANGS_GRANULAR);

  return Promise.all(granularLangs).then(all => {
    const summary = all.reduce(
      (acc, next) =>
        Object.assign({}, acc, {
          [next.locale]: makeFilename(next.locale, next.hash),
        }),
      {},
    );

    fs.outputJsonSync(path.join(OUT, "translationsFiles.json"), summary, {
      spaces: 2,
    });
  });
}

module.exports = {
  getTranslations,
  getTranslationsGranular,
};
