// @flow strict
import * as React from "react";
import styled from "styled-components";
import FlightDirect from "@kiwicom/orbit-components/lib/icons/FlightDirect";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";

import type { Stop } from "../../../records/Segment";
import Day from "../../Day";
import Duration from "../../Duration";

type Props = {|
  destination: Stop,
  source: Stop,
|};

const Flight = styled.div`
  position: relative;
  width: 100%;
`;

const TextOverflow = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const LongText = styled.div`
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WrapperTime = styled.div`
  min-width: 80px;
`;

const StarredTripSegment = ({ source, destination }: Props) => (
  <Stack spacing="tight" spaceAfter="small">
    <Stack shrink justify="between" align="center" spacing="tight">
      <Flight>
        <LongText>
          <Stack shrink align="center" spacing="tight">
            <TextWrapper weight="bold">
              <TextOverflow>
                {source.station.name} ({source.station.code})
              </TextOverflow>
              <FlightDirect />
              <TextOverflow>
                {destination.station.name} ({destination.station.code})
              </TextOverflow>
            </TextWrapper>
          </Stack>
          <TextWrapper type="secondary" size="small">
            <Day date={new Date(destination.time)} />
          </TextWrapper>
        </LongText>
      </Flight>
      <WrapperTime>
        <Stack direction="column" align="end" shrink spacing="tight">
          <TextWrapper weight="bold">
            <Duration from={new Date(source.time)} to={new Date(destination.time)} format="HH:mm" />
          </TextWrapper>
          <TextWrapper type="secondary" size="small">
            <Day date={new Date(source.time)} format="HH:mm" />
            {" - "}
            <Day date={new Date(destination.time)} format="HH:mm" />
          </TextWrapper>
        </Stack>
      </WrapperTime>
    </Stack>
  </Stack>
);

export default StarredTripSegment;
