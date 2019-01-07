// @flow strict
type Params = {|
  id: string,
  name: string,
  slug: string,
  code: string,
|};

type Gps = {|
  lat: number,
  lon: number,
|};

type Tag = {|
  month_from: number,
  month_to: number,
  tag: string,
|};

type City = {|
  autonomous_territory: boolean | null,
  code: string,
  continent: Params,
  country: Params,
|};

type Region = {|
  id: string,
  name: string,
  slug: string,
|};

type AlternativePoints = {|
  id: string,
  distance: number,
  duration: number,
|};

export type LocationType = "country" | "city" | "airport" | "continent" | "special";

export type LocationItem = {|
  active: boolean,
  alternative_departure_points: Array<AlternativePoints>,
  alternative_names: Array<string>,
  autonomous_territory: boolean | null,
  bus_stations?: number,
  city?: City,
  code: string,
  currency?: string,
  organizations?: Array<string>,
  neighbours?: Array<string>,
  dst_popularity_score: number,
  global_rank_dst: number,
  icao?: string,
  hotels: number,
  continent?: Params,
  country?: Params,
  population?: number,
  id: string,
  int_id?: string,
  location: Gps,
  name: string,
  rank: number,
  stations?: number,
  region: Region,
  slug?: string,
  code?: string,
  subdivision?: Params,
  airports?: number,
  special?: Array<mixed>,
  tags: Array<Tag>,
  timezone: string,
  type: LocationType,
|};
