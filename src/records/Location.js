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
  code: string,
  slug: string,
  location: {|
    lat: number,
    lng: number,
  |},
|};

export type LocationCountry = {|
  ...Common,
  type: "country",
|};

export type LocationSubdivision = {|
  ...Common,
  type: "subdivision",
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
  type: "airport",
  country: LocationArea,
  subdivision: LocationArea,
  city: LocationArea,
|};

export type Location = LocationCountry | LocationSubdivision | LocationCity | LocationAirport;
