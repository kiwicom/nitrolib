// @flow strict
import type { LocationPickerRow_item } from "../components/__generated__/LocationPickerRow_item.graphql";

const placeholder = ({ type, country, code, name }: LocationPickerRow_item) => {
  const countryName =
    (type === "city" || type === "autonomous_territory") && country && country.name
      ? ` (${country.name})`
      : "";
  const airportCode = (type === "airport" || type === "station") && code ? ` (${code})` : "";
  return String(name) + countryName + airportCode;
};

export default placeholder;
