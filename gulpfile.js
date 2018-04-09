const gulp = require("gulp");

const fetchBrandConfig = require("./etc/gulp/fetchBrandConfig");
const fetchSpreadsheet = require("./etc/gulp/fetchSpreadsheet");

const fetch = gulp.parallel(fetchBrandConfig, fetchSpreadsheet);

module.exports = {
  fetch,
};
