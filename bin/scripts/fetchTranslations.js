// @flow
const fs = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");
const R = require("ramda");

const OUT = path.join(process.cwd(), "data");
const LANGS = path.join(OUT, "languages.json");
const TKEYS = path.join(OUT, "tkeys.json");

const makeFilename = (locale, hash) => `translations/${locale}_${hash}.json`;

function fetchTranslations() /* : Promise<void> */ {
  if (!fs.existsSync(LANGS)) {
    return Promise.reject(new Error("Translations require fetching 'data/languages.json'!"));
  }
  const langs = fs.readJsonSync(LANGS);

  if (!fs.existsSync(TKEYS)) {
    return Promise.reject(
      new Error(
        "Translations require collecting translation keys to a 'data/tkeys.json' file! This can be done using the 'nitro keys <globs>' command.",
      ),
    );
  }
  const tkeys = fs.readJsonSync(TKEYS);

  return Promise.all(
    R.map(
      lang =>
        fetch(`https://nitro-word.skypicker.com/${lang.phraseApp}`)
          .then(res => {
            if (!res.ok) {
              return Promise.reject(
                new Error(`Failed to load translations for '${lang.phraseApp}'`),
              );
            }

            return res.json();
          })
          .then(data => {
            const filtered = R.mapObjIndexed((_, key) => R.prop(key, data.translations), tkeys);
            fs.outputJsonSync(path.join(OUT, makeFilename(data.locale, data.hash)), filtered, {
              spaces: 2,
            });
            return data;
          }),
      R.values(langs),
    ),
  ).then(all => {
    const summary = all.reduce(
      (acc, next) => R.assoc(next.locale, makeFilename(next.locale, next.hash), acc),
      {},
    );

    fs.outputJsonSync(path.join(OUT, "translationsFiles.json"), summary, {
      spaces: 2,
    });
  });
}

module.exports = fetchTranslations;
