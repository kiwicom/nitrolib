// @flow strict
import type { Location } from "../../../records/Location";

const placeholder = ({ type, country, code, name }: Location) => {
  const countryName =
    (type === "city" || type === "autonomous_territory") && country && country.name
      ? ` (${country.name})`
      : "";
  const airportCode = (type === "airport" || type === "station") && code ? ` (${code})` : "";

  return String(name) + countryName + airportCode;
};

export default placeholder;
