// @flow strict
import type { Location } from "../../../records/Location";

const slug = ({ type, code, country }: Location) =>
  ((type === "airport" || type === "station") && code) ||
  ((type === "city" || type === "autonomous_territory") && country && country.name);

export default slug;
