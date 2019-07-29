import { Airlines } from "./Airline";
import { airlineDefault } from "./Airline";
import { Countries } from "./Country";
import { countryDefault } from "./Country";
import { Continents } from "./Continents";
import { continentsDefault } from "./Continents";
import { BrandLanguage } from "./BrandLanguage";
import { brandLanguageDefault } from "./BrandLanguage";

export type Fetched = {
  airlines: Airlines,
  countries: Countries,
  continents: Continents,
  brandLanguage: BrandLanguage,
};

// eslint-disable-next-line import/prefer-default-export
export const fetchedDefault: Fetched = {
  airlines: { xx: airlineDefault },
  countries: { en: countryDefault },
  continents: continentsDefault,
  brandLanguage: brandLanguageDefault,
};
