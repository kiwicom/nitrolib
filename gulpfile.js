const gulp = require("gulp");

const fetchBrandConfig = require("./etc/gulp/fetchBrandConfig");
const fetchSpreadsheet = require("./etc/gulp/fetchSpreadsheet");

const statics = () => gulp.src("src/static/**").pipe(gulp.dest("dist/static"));

const fetch = gulp.parallel(fetchBrandConfig, fetchSpreadsheet);

const build = gulp.parallel(statics, fetch);

module.exports = {
  statics,
  fetch,
  default: build,
};
