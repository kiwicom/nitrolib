// @flow
import * as React from "react";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";

import type { LocationType } from "../records/LocationItem";
import type { Code } from "../records/Code";
import PickerRow from "../primitives/PickerRow";

type Props = {|
  onClick: () => void,
  countryCode: Code,
  cityCode?: string,
  name: string,
  selected: boolean,
  country?: string,
  type: LocationType,
|};

const SimplePlacePickerRow = ({
  onClick,
  name,
  cityCode,
  type,
  country,
  countryCode,
  selected,
}: Props) => {
  const slug = (type === "airport" && cityCode) || (type === "city" && country);
  return (
    <PickerRow onClick={onClick} selected={selected}>
      <Stack spacing="condensed" flex align="center">
        {type === "country" && <CountryFlag code={countryCode} name={name} />}
        <TextWrapper weight="bold">
          {name} {slug && `(${slug})`}
        </TextWrapper>
      </Stack>
    </PickerRow>
  );
};

export default SimplePlacePickerRow;
