// @flow strict
import * as React from "react";
import TripSector from "@kiwicom/orbit-components/lib/TripSector";
import TripDate from "@kiwicom/orbit-components/lib/TripSector/TripDate";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import styled from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import Accommodation from "@kiwicom/orbit-components/lib/icons/Accommodation";

import ItinerarySectorTitle from "../Title";
import Day from "../../../Timestamp";
import type { Sector } from "../../../../records/Sector";
import type { Segment, Carrier } from "../../../../records/Segment";
import ItinerarySegment from "../Segment";
import stopoverKeys from "../../services/stopoverKeys";
import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

type Props = {|
  sector: Sector,
  segments: Segment[],
  index?: number,
  carriers: Carrier[],
  stationChanged: string[],
  type: "oneWay" | "multicity" | "return" | "nomad",
  returnTrip?: boolean,
|};

const Wrapper = styled.div`
  padding-${/* sc-custom "left" */ left}: ${({ theme }: ThemeProps) => `${theme.orbit.spaceLarge}`};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const ItinerarySector = ({
  sector,
  segments,
  type,
  index,
  stationChanged,
  returnTrip,
  carriers,
}: Props) => {
  const { stopover } = sector;
  const { nightsCount, departure, arrival } = stopover;

  return (
    <Stack flex direction="column">
      <ItinerarySectorTitle
        sourceName={segments[0].source.station.name}
        destinationName={segments[segments.length - 1].destination.station.name}
        duration={sector.duration}
        index={index}
        direction={returnTrip ? "inbound" : "outbound"}
        type={type}
      />

      <TripSector>
        <TripDate>
          <Day date={new Date(segments[0].source.time)} />
        </TripDate>

        {segments.map((segment, i) => (
          <ItinerarySegment
            key={segment.id}
            highlight={stationChanged.some(id => id === segment.id)}
            segment={segment}
            carriers={carriers}
            returnTrip={returnTrip}
            last={i === segments.length - 1}
          />
        ))}
      </TripSector>

      {stopover.nightsCount > 0 && (
        <Wrapper>
          <Stack flex align="center" spacing="condensed">
            <Accommodation size="small" color="primary" />
            <Text type="secondary" size="small">
              <Translate {...stopoverKeys({ nightsCount, departure, arrival })} />
            </Text>
          </Stack>
        </Wrapper>
      )}
    </Stack>
  );
};

export default ItinerarySector;
