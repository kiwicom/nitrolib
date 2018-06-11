// @flow strict
import type { Countries } from "./Country";
import { countryDefault } from "./Country";
import type { Continents } from "./Continents";
import { continentsDefault } from "./Continents";
import type { BrandLanguage } from "./BrandLanguage";
import { brandLanguageDefault } from "./BrandLanguage";

export type Fetched = {|
  countries: Countries,
  continents: Continents,
  brandLanguage: BrandLanguage,
|};

// eslint-disable-next-line import/prefer-default-export
export const fetchedDefault: Fetched = {
  countries: { en: countryDefault },
  continents: continentsDefault,
  brandLanguage: brandLanguageDefault,
};
