// @flow strict
import type { Station } from "./Station";
import type { CityRadius } from "./CityRadius";
import type { Image } from "./Image";

export type Country = {|
  id: string,
  name: string,
  slug: string,
|};

export type City = {|
  id: string,
  name: string,
  slug: string,
  stations: Station[],
  nearbyCities: CityRadius,
  photo: Image,
  country: Country,
|};
