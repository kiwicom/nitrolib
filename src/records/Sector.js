// @flow strict
import { schema } from "normalizr";

import type { Station } from "./Station";
import { carrier, segment } from "./Segment";

export type Stopover = {|
  nightsCount: number,
  arrival: Station,
  departure: Station,
|};

export type Sector = {|
  id: string,
  segments: string[], // normalized, Segments
  carriers: string[], // normalized, Carriers
  duration: number,
  stopover: Stopover,
|};

// eslint-disable-next-line import/prefer-default-export
export const sector = new schema.Entity("sector", {
  segments: [segment],
  carriers: [carrier],
});
