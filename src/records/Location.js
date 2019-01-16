// @flow strict
export type LocationArea = {|
  id: string,
  name: string,
  slug: string,
  code: string,
|};

type Common = {|
  id: string,
  name: string,
  code?: string,
  slug: string,
  location: {|
    lat: number,
    lng: number,
  |},
|};

export type LocationCountry = {|
  ...Common,
  type: "country" | "special",
|};

export type LocationSubdivision = {|
  ...Common,
  type: "subdivision" | "autonomous_territory",
  country: LocationArea,
|};

export type LocationCity = {|
  ...Common,
  type: "city",
  country: LocationArea,
  subdivision: LocationArea,
|};

export type LocationAirport = {|
  ...Common,
  type: "airport" | "station",
  country: LocationArea,
  city: LocationArea,
|};

export type Location = LocationCountry | LocationSubdivision | LocationCity | LocationAirport;
