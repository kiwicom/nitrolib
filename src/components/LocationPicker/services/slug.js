// @flow strict
import type { LocationPickerRow_item } from "../components/__generated__/LocationPickerRow_item.graphql";

const slug = ({ type, code, country }: LocationPickerRow_item) =>
  ((type === "airport" || type === "station") && code) ||
  ((type === "city" || type === "autonomous_territory") && country && country.name);

export default slug;
