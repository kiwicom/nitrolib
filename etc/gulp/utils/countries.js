// @flow
const R = require("ramda");

const getCountries = R.map(R.pick(["id", "continent", "currency", "EN"]));

const getContinents = R.compose(
  R.map(R.sortBy(R.identity)),
  R.reduce(
    (acc, country) =>
      R.reduce(
        (acc2, continent) =>
          R.ifElse(
            R.has(continent),
            R.over(R.lensProp(continent), R.append(country.id)),
            R.assoc(continent, [country.id]),
          )(acc2),
        acc,
        country.continent,
      ),
    {},
  ),
  R.map(R.over(R.lensProp("continent"), R.ifElse(R.is(String), val => [val], R.identity))),
  R.reject(R.compose(R.isEmpty, R.prop("continent"))),
  R.values,
);

module.exports = {
  getCountries,
  getContinents,
};
