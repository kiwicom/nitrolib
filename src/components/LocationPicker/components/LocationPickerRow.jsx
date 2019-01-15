// @flow
import * as React from "react";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";
import { createFragmentContainer, graphql } from "react-relay";

import slugFunc from "../services/slug";
import type { LocationPickerRow_item } from "./__generated__/LocationPickerRow_item.graphql";
import PickerRow from "../primitives/PickerRow";

type Props = {|
  index: number,
  item: LocationPickerRow_item,
  handleSelect: (arg: LocationPickerRow_item, index: number) => void,
  selected: boolean,
|};

const LocationPickerRow = ({ handleSelect, item, selected, index }: Props) => {
  const { type, country, name, code } = item;
  const slug = slugFunc({ type, country, name, code });
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

// Boris help (not sure about @relay(mask: false), but it eliminates $refType error)
export default createFragmentContainer(
  LocationPickerRow,
  graphql`
    fragment LocationPickerRow_item on Location @relay(mask: false) {
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
