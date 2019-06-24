// @flow strict
import type { City, Country } from "./City";

export type Station = {|
  id: string,
  name: string,
  slug: string,
  code: string,
  city: City,
  country: Country,
  type: "AIRPORT" | "BUS_STATION" | "TRAIN_STATION",
|};
