// @flow strict
import type { BaggagePassengerType, Passenger } from "../../../../../records/Baggage";

export default function getPassengersFromId(
  paxIds: number[],
  passengersArray: Passenger[],
): BaggagePassengerType[] {
  return paxIds
    .map(paxId => {
      const passenger: ?Passenger = passengersArray.find(p => p.paxId === paxId);
      return (
        passenger && {
          paxId: passenger.paxId,
          firstName: passenger.firstName,
          middleName: passenger.middleName,
          lastName: passenger.lastName,
        }
      );
    })
    .filter(Boolean);
}
