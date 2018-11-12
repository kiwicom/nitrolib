// @flow strict
import type { Flight } from "./Flight";
import type { Transfer } from "./Transfers";

export type Trip = {|
  flights: Flight[],
  parts: (Flight | Transfer)[],
|};
