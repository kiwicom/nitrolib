#!/usr/bin/env node
// @flow strict
/* eslint-disable flowtype/require-valid-file-annotation */
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const R = require("ramda");

const collectKeys = require("./scripts/collectKeys");
const fetchBrandConfig = require("./scripts/fetchBrandConfig");
const fetchSpreadsheet = require("./scripts/fetchSpreadsheet");
const getTranslations = require("./scripts/getTranslations");
const mapLanguages = require("./scripts/mapLanguages");

const command = process.argv[2];

function log(what) {
  console.log(`${chalk.bold.green(">")} ${what}`);
}

function error(what) {
  console.log(`${chalk.bold.red(">")} ${what}`);
}

const commands = {
  keys: "keys",
  fetch: "fetch",
};

log(chalk.bold.green("NITRO"));
if (!commands[command]) {
  log("Available commands:");
  log(`  ${chalk.underline("keys")} - collects translation keys`);
  log(`  ${chalk.underline("fetch")} [path to translation files] - fetches production data`);
}

function keys() {
  const ours = JSON.parse(fs.readFileSync(path.join(__dirname, "../tkeys.json")));

  const globs = process.argv.slice(3).map(glob => path.join(process.cwd(), glob));
  const collected = collectKeys(globs);

  const data = R.merge(ours, collected);
  fs.outputJsonSync(path.join(process.cwd(), "data/tkeys.json"), data, {
    spaces: 2,
  });

  log(
    `DONE! Collected ${Object.keys(data).length} keys, out of which ${
      Object.keys(collected).length
    } are your own.`,
  );
}

function fetch(translationsPath) {
  Promise.all([fetchSpreadsheet(), fetchBrandConfig()])
    .then(() => getTranslations(translationsPath))
    .then(mapLanguages)
    .then(() => {
      log("DONE!");
    })
    .catch(err => {
      log(chalk.bold.red("ERROR"));
      error(err);
    });
}

if (command === commands.keys) {
  keys();
}

if (command === commands.fetch) {
  fetch(process.argv[3]);
}
