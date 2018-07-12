#!/usr/bin/env node
/* eslint-disable flowtype/require-valid-file-annotation */
const chalk = require("chalk");

const fetchBrandConfig = require("./scripts/fetchBrandConfig");
const fetchSpreadsheet = require("./scripts/fetchSpreadsheet");
const fetchTranslations = require("./scripts/fetchTranslations");
const mapLanguages = require("./scripts/mapLanguages");

const command = process.argv[2];

function log(what) {
  console.log(`${chalk.bold.green(">")} ${what}`);
}

function error(what) {
  console.log(`${chalk.bold.red(">")} ${what}`);
}

const commands = {
  fetch: "fetch",
};

log(chalk.bold.green("NITRO"));
if (!commands[command]) {
  log("Available commands:");
  log(`  ${chalk.underline("fetch")} - fetches production data`);
}

function fetch() {
  Promise.all([fetchSpreadsheet(), fetchBrandConfig()])
    .then(fetchTranslations)
    .then(mapLanguages)
    .then(() => {
      log("DONE!");
    })
    .catch(err => {
      log(chalk.bold.red("ERROR"));
      error(err);
    });
}

if (command === commands.fetch) {
  fetch();
}
