// @flow
import type { Countries } from "./Country";
import type { Continents } from "./Continents";

export type Fetched = {|
  countries: Countries,
  continents: Continents,
  langNames: { [string]: string },
|};
