// @flow strict
export type Language = {|
  id: string,
  name: string,
  flag: string,
  defaultCountry: string,
  continent: string | string[],
|};

export type Languages = { [key: string]: Language };
