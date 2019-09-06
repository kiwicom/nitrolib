// @noflow
const R = require("ramda");
const fs = require("fs-extra");
const path = require("path");

const OUT = path.join(process.cwd(), "data");

const makeGranularSync = (data, folder) =>
  R.compose(
    R.map(item =>
      fs.outputJsonSync(path.join(OUT, folder, `${item.id}.json`), item, {
        spaces: 2,
      }),
    ),
    R.values,
  )(data);

const makeGranular = (data, folder) =>
  R.compose(
    R.map(item =>
      fs.outputJson(path.join(OUT, folder, `${item.id}.json`), item, {
        spaces: 2,
      }),
    ),
    R.values,
  )(data);

module.exports = {
  makeGranular,
  makeGranularSync,
};
