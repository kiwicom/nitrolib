// @flow strict
export type Country = {|
  id: string,
  currency: string,
  continent: string | string[],
  EN: string,
|};

export type Countries = { [key: string]: Country };

// eslint-disable-next-line import/prefer-default-export
export const countryDefault: Country = {
  id: "gb",
  currency: "gbp",
  continent: ["eu"],
  EN: "United Kingdom",
};
