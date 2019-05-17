// @noflow
const fs = require("fs-extra");
const path = require("path");
const fetch = require("isomorphic-fetch");

const countries = require("./utils/countries");
const pkg = require("../../package");

const OUT = path.join(process.cwd(), "data");

const whitelist = [
  "countries",
  // "currencies",
  "languages",
  "airlines",
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

function write(name, data) {
  if (name === "countries") {
    fs.outputJsonSync(path.join(OUT, "countries.json"), data, {
      spaces: 2,
    });

    fs.outputJsonSync(path.join(OUT, "continents.json"), countries.getContinents(data), {
      spaces: 2,
    });
    return;
  }

  fs.outputJsonSync(path.join(OUT, `${name}.json`), data, {
    spaces: 2,
  });
}

function fetchSpreadsheet() /* : Promise<void[]> */ {
  return Promise.all(
    whitelist.map(name =>
      fetch(`https://nitro-hankey.skypicker.com/${name}`, {
        headers: {
          "User-Agent": `nitrolib/${pkg.version} (Kiwi.com production)`,
        },
      })
        .then(res => {
          if (!res.ok) {
            return Promise.reject(new Error(`Failed to fetch '${name}'`));
          }

          return res.json();
        })
        .then(data => {
          write(name, data);
        }),
    ),
  );
}

module.exports = fetchSpreadsheet;
