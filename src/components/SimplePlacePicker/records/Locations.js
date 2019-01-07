// @flow strict
import type { LocationItem } from "./LocationItem";

export type Meta = {|
  locale: {
    code: string,
    status: string,
  },
|};

export type Locations = {|
  locations: Array<LocationItem>,
  meta: Meta,
|};
