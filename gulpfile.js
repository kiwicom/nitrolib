/* eslint-disable import/no-extraneous-dependencies */
const gulp = require("gulp");

const collectKeys = require("./etc/gulp/collectKeys");
const fetchBrandConfig = require("./etc/gulp/fetchBrandConfig");
const fetchSpreadsheet = require("./etc/gulp/fetchSpreadsheet");
const fetchTranslations = require("./etc/gulp/fetchTranslations");

const statics = () => gulp.src("src/static/**").pipe(gulp.dest("dist/static"));

const fetch = gulp.parallel(
  fetchBrandConfig,
  gulp.series(gulp.parallel(collectKeys, fetchSpreadsheet), fetchTranslations),
);

const build = gulp.parallel(statics, fetch);

module.exports = {
  statics,
  fetch,
  default: build,
};
