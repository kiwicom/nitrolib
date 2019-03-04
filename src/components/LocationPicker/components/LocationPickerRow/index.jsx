// @flow strict
import * as React from "react";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";
import { createFragmentContainer, graphql } from "react-relay";

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

const LocationPickerRow = ({ item, selected, onSelect }: Props) => {
  const { type, name, code } = item;

  const slug = getSlug(toLocation(item));

  return (
    <PickerRow onClick={() => onSelect(toLocation(item))} selected={selected}>
      <Stack spacing="condensed" flex align="center">
        {/* $FlowExpected: TODO describe */}
        {type === "country" && code && <CountryFlag code={code.toLowerCase()} />}
        <TextWrapper weight="bold">
          {name} {slug}
        </TextWrapper>
      </Stack>
    </PickerRow>
  );
};

export default createFragmentContainer(
  LocationPickerRow,
  graphql`
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
);
