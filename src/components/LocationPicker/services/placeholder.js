// @flow strict
import type { Location } from "../../../records/Location";

const placeholder = (loc: Location): string => {
  const { type, name } = loc;
  const countryName = loc.country ? `(${loc.country.name})` : "";
  const codeSlug = loc.code ? `(${loc.code})` : "";

  switch (type) {
    case "city":
      return `${name} ${countryName}`;

    case "autonomous_territory":
      return `${name} ${countryName}`;

    case "airport":
      return `${name} ${codeSlug}`;

    case "station":
      return `${name} ${codeSlug}`;

    default:
      return name;
  }
};

export default placeholder;
