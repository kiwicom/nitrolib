// @flow strict
import type { City } from "./City";

type Gps = {|
  lat: number,
  lng: number,
|};

type Radius = {|
  center: Gps,
  radius: number,
|};

export type CityRadius = {|
  id: number,
  slug: string,
  radius: Radius,
  cities: City[],
|};
