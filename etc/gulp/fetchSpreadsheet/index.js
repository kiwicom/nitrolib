// @flow
const fs = require("fs-extra");
const path = require("path");
const R = require("ramda");
const tabletop = require("tabletop");

require("../../dotenv");
const processValue = require("./processValue");

const whitelist = [
  // "apms",
  "languages",
  // "affiliates",
  // "emails",
  "currencies",
  // "airlineTerms",
  "countries",
  // "team",
  // "managmentTeam",
  // "countryPhonePrefixes",
  // "about",
  // "investors",
  // "airlinesAdultThreshold",
  // "airlineRestrictions",
];

const rowMapper = R.compose(R.map(processValue), R.omit(["IGNORE"]));

function fetchSpreadsheet() /* : Promise<void> */ {
  return new Promise(resolve => {
    tabletop.init({
      key: process.env.SECRET_SPREADSHEET,
      simpleSheet: false,
      callback(data) {
        Object.keys(data)
          .filter(key => whitelist.includes(key))
          .forEach(key => {
            const table = data[key];
            const output = table.elements
              .map(rowMapper)
              .reduce((acc, row) => R.assoc(row.id, row, acc), {});

            fs.outputJsonSync(path.join(__dirname, `../../../data/${key}.json`), output, {
              spaces: 2,
            });
          });
        resolve();
      },
    });
  });
}

module.exports = fetchSpreadsheet;
