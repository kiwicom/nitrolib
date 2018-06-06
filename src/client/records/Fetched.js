// @flow strict
import type { Countries } from "./Country";
import type { Continents } from "./Continents";
import type { BrandLanguage } from "./BrandLanguage";

export type Fetched = {|
  countries: Countries,
  continents: Continents,
  brandLanguage: BrandLanguage,
|};
