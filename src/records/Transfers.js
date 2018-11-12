// @flow strict
import type { DepartureArrival } from "./Flight";

export type Transfer = {
  id: ?number,
  departure: ?DepartureArrival,
  arrival: ?DepartureArrival,
  vehicle: Object,
  type: ?string, // bus|train
  carrier: ?string, // called airline in Flight
  pnr: null,
  operatingAirline: null,
  flightIndex: ?number,
};
