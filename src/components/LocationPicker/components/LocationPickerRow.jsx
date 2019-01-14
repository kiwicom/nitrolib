// @flow
import * as React from "react";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";
import { createFragmentContainer, graphql } from "react-relay";

import type { LocationPickerRow_item } from "./__generated__/LocationPickerRow_item.graphql";
import PickerRow from "../primitives/PickerRow";

type Props = {|
  item: LocationPickerRow_item,
  handleSelect: (arg: LocationPickerRow_item, index: number) => void,
  selected: boolean,
  index: number,
|};

const LocationPickerRow = ({ handleSelect, item, index, selected }: Props) => {
  const { type, country, name, code } = item;
  const slug = (type === "airport" && code) || (type === "city" && country && country.name);
  return (
    <PickerRow onClick={() => handleSelect(item, index)} selected={selected}>
      <Stack spacing="condensed" flex align="center">
        {/* $FlowExpected: TODO describe */}
        {type === "country" && <CountryFlag code={code} />}
        <TextWrapper weight="bold">
          {name} {slug && `(${slug})`}
        </TextWrapper>
      </Stack>
    </PickerRow>
  );
};

export default createFragmentContainer(
  LocationPickerRow,
  graphql`
    fragment LocationPickerRow_item on Location {
      id
      type
      name
      country {
        name
        code
      }
      code
    }
  `,
);
