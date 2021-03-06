// @noflow
const fs = require("fs-extra");
const path = require("path");
const fetch = require("isomorphic-fetch");

const { makeGranularSync } = require("./utils/makeGranular");
const pkg = require("../../package");

const fetchBrandConfig = granular =>
  fetch("https://booking-api.skypicker.com/api/v0.1/configs", {
    headers: {
      "User-Agent": `nitrolib/${pkg.version} (Kiwi.com production)`,
    },
  })
    .then(res => res.json())
    .then(data => {
      if (granular) {
        return makeGranularSync(data, "brands");
      }

      return fs.outputJsonSync(path.join(process.cwd(), "data/brands.json"), data, {
        spaces: 2,
      });
    });

module.exports = fetchBrandConfig;
