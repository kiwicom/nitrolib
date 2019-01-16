// @flow strict
import type { Location } from "../../../records/Location";

const slug = (loc: Location): string | boolean => {
  const { type } = loc;
  const code = loc.code ? `(${loc.code})` : "";
  const country = loc.country && loc.country.name ? `(${loc.country.name})` : "";

  switch (type) {
    case "airport":
      return code;

    case "station":
      return code;

    case "city":
      return country;

    case "autonomous_territory":
      return country;

    default:
      return false;
  }
};
export default slug;
