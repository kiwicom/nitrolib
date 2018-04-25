// @flow
const fs = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");

const OUT = path.join(__dirname, "../../data/");

const whitelist = [
  "countries",
  "currencies",
  "languages",
  // "about",
  // "affiliates",
  // "airlinesAdultThreshold",
  // "airlineRestrictions",
  // "airlineTerms",
  // "apms",
  // "countryPhonePrefixes",
  // "emails",
  // "investors",
  // "managmentTeam",
  // "team",
];

function fetchSpreadsheet() /* : Promise<void[]> */ {
  return Promise.all(
    whitelist.map(what =>
      fetch(`http://localhost:8081/${what}`) // TODO replace with Hankey URL
        .then(res => {
          if (!res.ok) {
            return Promise.reject(new Error(`Failed to fetch '${what}'`));
          }

          return res.json();
        })
        .then(data => {
          fs.outputJsonSync(path.join(OUT, `${what}.json`), data, {
            spaces: 2,
          });
        }),
    ),
  );
}

module.exports = fetchSpreadsheet;
