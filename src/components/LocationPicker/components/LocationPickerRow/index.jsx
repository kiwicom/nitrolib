// @flow strict
import * as React from "react";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";
import { createFragmentContainer, graphql } from "@kiwicom/relay";
import Trip from "@kiwicom/orbit-components/lib/icons/Trip";
import Map from "@kiwicom/orbit-components/lib/icons/Map";
import LocationIcon from "@kiwicom/orbit-components/lib/icons/Location";
import City from "@kiwicom/orbit-components/lib/icons/City";
import Leisure from "@kiwicom/orbit-components/lib/icons/Leisure";
import AirplaneTakeoff from "@kiwicom/orbit-components/lib/icons/AirplaneTakeoff";

import getSlug from "../../services/slug";
import type { LocationPickerRow_item } from "./__generated__/LocationPickerRow_item.graphql";
import PickerRow from "../../primitives/PickerRow";
import type { Location } from "../../../../records/Location";
import toLocation from "./services/toLocation";

type Props = {|
  item: LocationPickerRow_item,
  selected: boolean,
  onSelect: (loc: Location) => void,
|};

const icons = {
  country: Trip,
  region: Map,
  region_group: Map,
  province: Map,
  city: City,
  airport: AirplaneTakeoff,
  hotel: Leisure,
  default: LocationIcon,
};

const LocationPickerRow = ({ item, selected, onSelect }: Props) => {
  const { locationId, type, name, code } = item;

  const matches = locationId && locationId.match(/^country-([A-Z]{2})$/);
  const countryCode = type === "country" && (matches ? matches[1] : code);
  const slug = getSlug(toLocation(item));
  const Icon = (type && icons[type]) || icons.default;

  return (
    <PickerRow onClick={() => onSelect(toLocation(item))} selected={selected}>
      <Stack spacing="condensed" flex align="center">
        <Icon color="secondary" />
        <TextWrapper weight="bold">
          {name} {slug}
        </TextWrapper>
        {countryCode && <CountryFlag code={countryCode.toLowerCase()} />}
      </Stack>
    </PickerRow>
  );
};

export default createFragmentContainer(LocationPickerRow, {
  item: graphql`
    fragment LocationPickerRow_item on Location {
      locationId
      type
      name
      code
      slug

      location {
        lat
        lng
      }

      city {
        locationId
        name
        slug
        code
      }
      country {
        locationId
        name
        slug
        code
      }
      subdivision {
        locationId
        name
        slug
        code
      }
    }
  `,
});
