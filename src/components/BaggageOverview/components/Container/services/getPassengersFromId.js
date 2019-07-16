// @flow strict
import * as R from "ramda";

import type { BaggagePassengerType, Passenger } from "../../../../../records/Baggage";

export default function getPassengersFromId(
  paxIds: number[],
  passengersArray: Passenger[],
): BaggagePassengerType[] {
  return paxIds.map(paxId => {
    const passenger = passengersArray.find(p => p.paxId === paxId);
    return {
      paxId: passenger.paxId,
      firstName: passenger.firstName,
      middleName: passenger.middleName,
      lastName: passenger.lastName,
    };
  });
}
