// @flow
import * as R from "ramda";

export type Country = {|
  id: string,
  currency: string,
  continent: string,
  EN: string,
|};

export type Countries = { [key: string]: Country };

export const getContinents = (countries: Countries) =>
  R.compose(
    R.map(R.sortBy(R.identity)),
    R.reduce(
      (acc, country) =>
        R.ifElse(
          R.has(country.continent),
          R.over(R.lensProp(country.continent), R.append(country.id)),
          R.assoc(country.continent, [country.id]),
        )(acc),
      {},
    ),
    R.values,
  )(countries);

export const countryDefault: Country = {
  id: "gb",
  currency: "gbp",
  continent: "eu",
  EN: "United Kingdom",
};
