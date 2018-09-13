// @flow strict
const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const fetch = require("node-fetch");
const R = require("ramda");

const OUT = path.join(process.cwd(), "data");
const LANGS = path.join(OUT, "languages.json");
const TKEYS = path.join(OUT, "tkeys.json");

const makeFilename = (locale, hash) => `translations/${locale}_${hash}.json`;

/* ::
type Intl = {|
  locale: string,
  translations: { [key: string]: string },
|};
*/

function getLocale(locale, folder) /* : Promise<Intl> */ {
  if (folder) {
    return Promise.resolve({
      locale,
      translations: fs.readJsonSync(path.join(folder, `${locale}.json`)),
    });
  }

  return fetch(`https://nitro-word.skypicker.com/${locale}`).then(res => {
    if (!res.ok) {
      return Promise.reject(new Error(`Failed to load translations for '${locale}'`));
    }

    return res.json();
  });
}

function getTranslations(folder /* : ?string */) /* : Promise<void> */ {
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
        getLocale(lang.phraseApp, folder).then(({ translations, locale }) => {
          const filtered = R.mapObjIndexed((_, key) => R.prop(key, translations), tkeys);
          const hash = crypto
            .createHash("sha1")
            .update(JSON.stringify(filtered, null, 2), "binary")
            .digest("hex");

          fs.outputJsonSync(path.join(OUT, makeFilename(locale, hash)), filtered, {
            spaces: 2,
          });

          return { locale, hash };
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

module.exports = getTranslations;
