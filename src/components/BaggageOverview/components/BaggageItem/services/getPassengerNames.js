// @flow strict

import type { BaggagePassengerType } from "../../../../../records/Baggage";

const getPassengerNames = (passengersArr: BaggagePassengerType[]): string =>
  passengersArr
    .map(p => `${p.firstName[0]}. ${p.middleName ? `${p.middleName[0]}. ` : ""}${p.lastName}`)
    .join(", ");

export default getPassengerNames;
