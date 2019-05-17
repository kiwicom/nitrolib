#!/usr/bin/env node
// @noflow
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable no-console */
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const yargs = require("yargs");
const R = require("ramda");

const collectKeys = require("./scripts/collectKeys");
const fetchBrandConfig = require("./scripts/fetchBrandConfig");
const fetchSpreadsheet = require("./scripts/fetchSpreadsheet");
const getTranslations = require("./scripts/getTranslations");
const missingKeys = require("./scripts/missingKeys");
const mapLanguages = require("./scripts/mapLanguages");

const command = process.argv[2];

const OUT = path.join(process.cwd(), "data");
const TRANSLATIONS_FE = path.join(process.cwd(), "node_modules/@kiwicom/translations/lib");
const TKEYS = path.join(OUT, "tkeys.json");

function log(what) {
  console.log(`${chalk.bold.green(">")} ${what}`);
}

function error(what) {
  console.log(`${chalk.bold.red(">")} ${what}`);
}

// Unstable, not in JS spec
const sortKeys = obj =>
  // eslint-disable-next-line fp/no-mutating-methods
  Object.keys(obj)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

const resolve = glob => path.join(process.cwd(), glob);

const commands = {
  keys: "keys",
  "keys-check": "keys-check",
  translations: "translations",
  fetch: "fetch",
};

log(chalk.bold.green("NITRO"));
if (!commands[command]) {
  log("Available commands:");
  log(`  ${chalk.underline.bold("keys")} [...globs]        - collects translation keys`);
  log(`    ${chalk.underline("...globs")} - where to collect keys from`);
  log("");
  log(`  ${chalk.underline.bold("keys-check")}             - checks missing translations`);
  log("");
  log(`  ${chalk.underline.bold("translations")} [--path]  - fetches translations`);
  log(`    ${chalk.underline("--path")} (optional) - where to take translations from`);
  log("");
  log(`  ${chalk.underline.bold("fetch")}                  - fetches production data`);
  log("");
  log("See CLI docs for details at https://github.com/kiwicom/nitrolib");
}

function keys(globs) {
  const ours = JSON.parse(fs.readFileSync(path.join(__dirname, "../tkeys.json")));

  const collected = collectKeys(globs.map(resolve));

  const data = sortKeys(R.merge(ours, collected));
  fs.outputJsonSync(path.join(OUT, "tkeys.json"), data, {
    spaces: 2,
  });

  log(
    `DONE! Collected ${Object.keys(data).length} keys, out of which ${
      Object.keys(collected).length
    } are your own.`,
  );
}

function keysCheck() {
  const TFILES = path.join(OUT, "translationsFiles.json");
  if (!fs.existsSync(TFILES)) {
    error(
      "Key checking requires the 'data/translationsFiles.json' file. Run 'nitro translations'.",
    );
    process.exit(1);
    return;
  }

  if (!fs.existsSync(TKEYS)) {
    error(
      "'fetch' requires collecting translation keys to a 'data/tkeys.json' file! This can be done using the 'nitro keys <globs>' command.",
    );
    process.exit(1);
    return;
  }

  const missing = missingKeys(OUT, TKEYS, TFILES);
  if (missing.length > 0) {
    missing.forEach(error);
    process.exit(1);
  }

  log("All good.");
}

const TRANSLATIONS_NEEDS = [
  path.join(OUT, "brands.json"),
  path.join(OUT, "languages.json"),
  path.join(OUT, "countries.json"),
  path.join(OUT, "tkeys.json"),
];

function translations(tFile) {
  const TRANSLATIONS = tFile || TRANSLATIONS_FE;
  if (!fs.existsSync(TRANSLATIONS)) {
    error(
      `Translations not found at '${TRANSLATIONS}'${
        TRANSLATIONS === TRANSLATIONS_FE ? ", have you installed '@kiwicom/translations'?" : ""
      }`,
    );
    process.exit(1);
    return;
  }

  const good = TRANSLATIONS_NEEDS.reduce((ok, need) => {
    if (!fs.existsSync(need)) {
      error(
        `Task 'translations' requires running the 'keys' and 'fetch' commands first! Missing file: ${need}`,
      );
      return false;
    }
    return ok;
  }, true);

  if (!good) {
    process.exit(1);
    return;
  }

  getTranslations(TKEYS, TRANSLATIONS)
    .then(mapLanguages)
    .then(() => {
      log("DONE!");
    })
    .catch(err => {
      log(chalk.bold.red("ERROR"));
      error(err);
    });
}

function fetch() {
  Promise.all([fetchSpreadsheet(), fetchBrandConfig()])
    .then(() => {
      log("DONE!");
    })
    .catch(err => {
      log(chalk.bold.red("ERROR"));
      error(err);
    });
}

if (command === commands.keys) {
  keys(process.argv.slice(3));
}

if (command === commands["keys-check"]) {
  keysCheck();
}

if (command === commands.translations) {
  translations(yargs.argv.path);
}

if (command === commands.fetch) {
  fetch();
}
