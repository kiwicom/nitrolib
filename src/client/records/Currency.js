// @flow
export type Currency = {|
  id: string,
  name: string,
  format: string,
  uncertainFormat: boolean,
  round: string, // number string
  enabledOnAffilId: string | Array<string>,
  fallback: string,
|};

export type Currencies = {
  [key: string]: Currency,
};

// eslint-disable-next-line import/prefer-default-export
export const currencyDefault: Currency = {
  id: "eur",
  name: "Euro",
  format: "__price__ €",
  uncertainFormat: false,
  round: "2",
  enabledOnAffilId: "",
  fallback: "",
};
