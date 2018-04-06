const gulp = require("gulp");

const fetchSpreadsheet = require("./etc/gulp/fetchSpreadsheet");

const fetch = gulp.parallel(fetchSpreadsheet);

module.exports = {
  fetch,
};
