// @flow strict
import type { Countries } from "./Country";
import type { Continents } from "./Continents";
import type { LanguagesData } from "./Languages";

export type Fetched = {|
  countries: Countries,
  continents: Continents,
  languagesData: LanguagesData,
|};
