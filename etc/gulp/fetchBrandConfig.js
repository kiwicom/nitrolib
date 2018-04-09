const fs = require("fs-extra");
const path = require("path");
const fetch = require("node-fetch");

const fetchBrandConfig = () =>
  fetch("https://booking-api.skypicker.com/api/v0.1/configs")
    .then(res => res.json())
    .then(data => {
      fs.outputJsonSync(path.join(__dirname, "../../data/brands.json"), data, {
        spaces: 2,
      });
    });

module.exports = fetchBrandConfig;
