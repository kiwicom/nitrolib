// @flow strict
import type { Airlines } from "./Airline";
import { airlineDefault } from "./Airline";
import type { Countries } from "./Country";
import { countryDefault } from "./Country";
import type { Continents } from "./Continents";
import { continentsDefault } from "./Continents";
import type { BrandLanguage } from "./BrandLanguage";
import { brandLanguageDefault } from "./BrandLanguage";

export type Fetched = {|
  airlines: Airlines,
  countries: Countries,
  continents: Continents,
  brandLanguage: BrandLanguage,
|};

// eslint-disable-next-line import/prefer-default-export
export const fetchedDefault: Fetched = {
  airlines: { xx: airlineDefault },
  countries: { en: countryDefault },
  continents: continentsDefault,
  brandLanguage: brandLanguageDefault,
};
