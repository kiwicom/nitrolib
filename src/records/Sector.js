// @flow strict
import { schema } from "normalizr";

import type { Station } from "./Station";
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
