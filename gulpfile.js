/* eslint-disable import/no-extraneous-dependencies */
const gulp = require("gulp");

const collectKeys = require("./etc/gulp/collectKeys");
const fetchBrandConfig = require("./etc/gulp/fetchBrandConfig");
const fetchSpreadsheet = require("./etc/gulp/fetchSpreadsheet");
const fetchTranslations = require("./etc/gulp/fetchTranslations");
const mapLanguages = require("./etc/gulp/mapLanguages");

const fetch = gulp.series(
  gulp.parallel(
    fetchBrandConfig,
    gulp.series(gulp.parallel(collectKeys, fetchSpreadsheet), fetchTranslations),
  ),
  mapLanguages,
);

const build = gulp.parallel(fetch);

module.exports = {
  fetch,
  default: build,
};
