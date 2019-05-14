// @flow strict
import type { LocationPickerRow_item } from "../__generated__/LocationPickerRow_item.graphql";
import type { Location, LocationArea } from "../../../../../records/Location";

type LocationAreaInput = {|
  +locationId: ?string,
  +name: ?string,
  +slug: ?string,
  +code: ?string,
|};

const locationAreaDefault = {
  locationId: "",
  name: "",
  slug: "",
  code: "",
};

function toLocationArea(input: LocationAreaInput): LocationArea {
  return {
    id: input.locationId || "",
    name: input.name || "",
    slug: input.slug || "",
    code: input.code || "",
  };
}

function toLocation(input: LocationPickerRow_item): Location {
  const common = {
    id: input.locationId || "",
    name: input.name || "",
    code: input.code || "",
    slug: input.slug || "",
    location: {
      lat: input.location?.lat || 0,
      lng: input.location?.lng || 0,
    },
  };

  if (input.type === "airport") {
    return {
      ...common,
      type: "airport",
      city: toLocationArea(input.city || locationAreaDefault),
      country: toLocationArea(input.country || locationAreaDefault),
    };
  }

  if (input.type === "city") {
    return {
      ...common,
      type: "city",
      country: toLocationArea(input.country || locationAreaDefault),
      subdivision: toLocationArea(input.subdivision || locationAreaDefault),
    };
  }

  if (input.type === "subdivision") {
    return {
      ...common,
      type: "subdivision",
      country: toLocationArea(input.country || locationAreaDefault),
    };
  }

  // country (+ in holidaysLocations - province, etc.)
  return {
    ...common,
    type: input.type,
  };
}

export default toLocation;
