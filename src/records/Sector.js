// @flow strict
import { schema } from "normalizr";

import type { ItineraryNormalized } from "./Itinerary";
import type { Station } from "./Station";
// eslint-disable-next-line import/no-cycle
import { carrier, segment } from "./Segment";
import type { Carrier, SegmentDeep } from "./Segment";

export type Stopover = {|
  nightsCount: number,
  arrival: Station,
  departure: Station,
|};

export type Sector = {|
  id: string,
  segments: string[], // normalized, Segment[]
  carriers: string[], // normalized, Carrier[]
  duration: number,
  stopover: Stopover,
|};

export type SectorDeep = {|
  ...Sector,
  segments: SegmentDeep[],
  carriers: Carrier[],
|};

// eslint-disable-next-line import/prefer-default-export
export const sector = new schema.Entity("sector", {
  segments: [segment],
  carriers: [carrier],
});

export const getSector = (obj: ItineraryNormalized, id: string): ?Sector =>
  Object.keys(obj.entities.sector)
    .map(key => obj.entities.sector[key])
    .find(item => item.id === id);

export const getSectors = (obj: ItineraryNormalized): Sector[] =>
  Object.keys(obj.entities.sector).map(key => obj.entities.sector[key]);
