// @flow strict
import { schema } from "normalizr";

import type { Station } from "./Station";
import type { ItineraryNormalized } from "./Itinerary";

export type Stop = {|
  station: Station,
  time: Date,
|};

type Guarantee = "KIWI_COM" | "CARRIER";
export type Layover = {|
  duration: number,
  guarantee: Guarantee,
  isStationChange: boolean,
  isBaggageRecheck: boolean,
|};

export type Carrier = {|
  id: string,
  name: string,
  code: string,
|};

export const carrier = new schema.Entity("carrier");

type SeatDimenstion = {|
  value: string,
  unit: "CM" | "INCH" | "DEGREE",
|};

export type SeatInfo = {|
  pitch: SeatDimenstion,
  width: SeatDimenstion,
  recline: SeatDimenstion,
  hasPower: boolean,
  hasAudioVideo: boolean,
  hasWifi: boolean,
|};

export type Segment = {|
  id: string,
  source: Stop,
  destination: Stop,
  duration: number,
  type: "BUS" | "FLIGHT" | "TRAIN",
  code: string,
  layover: Layover,
  carrier: string, // normalized, Carrier
  operatingCarrier: string, // normalized, Carrier
  seatInfo: SeatInfo,
|};

export type Segments = { [key: string]: Segment };

export type SegmentDeep = {|
  ...Segment,
  carrier: Carrier,
  operatingCarrier: Carrier,
|};

export const segment = new schema.Entity("segment", {
  carrier,
  operatingCarrier: carrier,
});

export const getSegment = (obj: ItineraryNormalized, id: string): ?Segment =>
  Object.keys(obj.entities.segment)
    .map(key => obj.entities.segment[key])
    .find(item => item.id === id);

export const getSegments = (obj: ItineraryNormalized, ids: string[]): Segment[] =>
  ids.map(id => obj.entities.segment[id]);
