import { Stopover } from "../../../records/Sector";

export const stopoverKeys = ({ arrival, departure, nightsCount }: Stopover) => {
  if (departure.code !== arrival.code && nightsCount > 0) {
    return {
      t: __("result.night_in_destination_and_change_to"),
      values: { place: arrival.name, changePlace: arrival.code },
    };
  }

  return { t: __("result.night_in_destination"), values: { place: arrival.name } };
};

export default stopoverKeys;
