// @flow strict
import { schema } from "normalizr";

import type { Station } from "./Station";

export type Stop = {|
  station: Station,
  time: Date,
|};

export type Layover = {|
  duration: number,
  isKiwiComGuarantee: boolean,
  isStationChange: boolean,
  isBaggageRecheck: boolean,
|};

export type Carrier = {|
  id: string,
  name: string,
  code: string,
|};

export const carrier = new schema.Entity("carrier");

export type SeatInfo = {|
  pitch: number,
  width: number,
  recline: number,
  hasPower: boolean,
  hasAudioVideo: boolean,
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
  hasWifi: boolean,
|};

export type SegmentDeep = {|
  ...Segment,
  carrier: Carrier,
  operatingCarrier: Carrier,
|};

export const segment = new schema.Entity("segment", {
  carrier,
  operatingCarrier: carrier,
});
