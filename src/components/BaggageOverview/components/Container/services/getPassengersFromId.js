// @flow strict
import * as R from "ramda";

import type { BaggagePassengerType, Passenger } from "../../../../../records/Baggage";

export default function getPassengersFromId(
  paxIds: number[],
  passengersArray: Passenger[],
): BaggagePassengerType[] {
  return R.innerJoin((passenger, paxId) => passenger.paxId === paxId, passengersArray, paxIds).map(
    p => ({
      paxId: p.paxId,
      firstName: p.firstName,
      middleName: p.middleName,
      lastName: p.lastName,
    }),
  );
}
