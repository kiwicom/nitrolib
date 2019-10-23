// @flow strict

import type { BaggagePassengerType } from "../../../../../records/Baggage";

const asianCharacters = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;

const getPassengerNames = (passengersArr: BaggagePassengerType[]): string =>
  passengersArr
    .map(
      p =>
        `${asianCharacters.test(p.firstName) ? p.firstName : `${p.firstName[0]}.`} ${
          p.middleName ? `${p.middleName[0]}. ` : ""
        }${p.lastName}`,
    )
    .join(", ");

export default getPassengerNames;
