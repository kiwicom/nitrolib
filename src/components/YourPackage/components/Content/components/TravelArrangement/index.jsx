// @flow strict

import * as React from "react";
import styled from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";

import Translate from "../../../../../Translate";
import Sector from "./Sector";
import { type TravelArrangement as TravelArrangementType } from "../../../../records/TravelArrangement";

type Props = {|
  data: TravelArrangementType,
  columnLayout?: boolean,
|};

const SectorWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0;
`;

const TravelArrangement = ({ data, columnLayout }: Props) => {
  const content = [
    <SectorWrapper key="1">
      <Sector data={data.itineraryOutbound} direction="takeOff" />
    </SectorWrapper>,
    <SectorWrapper key="2">
      <Sector data={data.itineraryInbound} direction="landing" />
    </SectorWrapper>,
  ];

  return (
    <Stack spaceAfter="large">
      <Heading element="h4" type="title3" spaceAfter="small">
        <Translate t="holidays.detail.travel_arrangement" />
      </Heading>
      {columnLayout ? (
        content
      ) : (
        <Stack spacing="comfy" direction="column">
          {content}
        </Stack>
      )}
    </Stack>
  );
};

export default TravelArrangement;
