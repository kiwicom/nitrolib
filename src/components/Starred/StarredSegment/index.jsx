// @flow
import * as React from "react";
import styled from "styled-components";
import FlightDirect from "@kiwicom/orbit-components/lib/icons/FlightDirect";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";

import type { DepartureArrival } from "../../../records/Flight";
import Day from "../../Day";
import Duration from "../../Duration";

type Props = {|
  departure: DepartureArrival,
  arrival: DepartureArrival,
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

const StarredTripSegment = ({ departure, arrival }: Props) => (
  <Stack spacing="tight" spaceAfter="small">
    <Stack shrink justify="between" align="center" spacing="tight">
      <Flight>
        <LongText>
          <TextWrapper weight="bold">
            <Stack shrink align="center" spacing="tight">
              <TextOverflow>
                {departure.where.name} ({departure.where.code})
              </TextOverflow>
              <FlightDirect />
              <TextOverflow>
                {arrival.where.name} ({arrival.where.code})
              </TextOverflow>
            </Stack>
          </TextWrapper>
          <TextWrapper type="secondary" size="small">
            <Day date={departure.when.local} />
          </TextWrapper>
        </LongText>
      </Flight>
      <WrapperTime>
        <Stack direction="column" align="end" shrink spacing="tight">
          <TextWrapper weight="bold">
            <Duration from={departure.when.local} to={arrival.when.local} format="HH:mm" />
          </TextWrapper>
          <TextWrapper type="secondary" size="small">
            <Day date={departure.when.local} format="HH:mm" />
            {" - "}
            <Day date={arrival.when.local} format="HH:mm" />
          </TextWrapper>
        </Stack>
      </WrapperTime>
    </Stack>
  </Stack>
);

export default StarredTripSegment;
