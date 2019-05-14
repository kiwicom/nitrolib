// @flow strict
import type { Location } from "../../../records/Location";

const placeholder = (loc: Location): string => {
  const { type, name } = loc;

  switch (type) {
    case "city":
    case "autonomous_territory":
      return `${name} ${loc.country && loc.country.name ? `(${loc.country.name})` : ""}`;

    case "airport":
    case "station":
      return `${name} ${loc.code ? `(${loc.code})` : ""}`;

    default:
      return name;
  }
};

export default placeholder;
