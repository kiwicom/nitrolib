// @flow strict
import * as React from "react";
import styled from "styled-components";
import FlightDirection from "@kiwicom/orbit-components/lib/icons/FlightDirect";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import TranslateNode from "../../../TranslateNode";
import Time from "../../../Time";
import tripColors from "../../services/tripColors";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import Translate from "../../../Translate";

type Props = {|
  sourceName: string,
  destinationName: string,
  duration: number,
  index?: number,
  type: "oneWay" | "return" | "multicity" | "nomad",
  direction: "outbound" | "inbound",
|};

const DIRECTION_TYPES = {
  inbound: __("result.inbound"),
  outbound: __("result.outbound"),
};

const TripLabel = styled.div`
  color: ${({ tripIndex }) => tripColors(tripIndex + 1, "#000")};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightBold};
  text-transform: uppercase;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
`;

TripLabel.defaultProps = {
  theme: themeDefault,
};

const TripTrime = styled.div`
  font-size: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  padding-${/* sc-custom "left" */ left}: ${({ theme }: ThemeProps) => theme.orbit.spaceXSmall};
`;

TripTrime.defaultProps = {
  theme: themeDefault,
};

const TitleWrapper = styled.div`
  padding-top: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceMedium};
  display: flex;
  align-items: center;
`;

TitleWrapper.defaultProps = {
  theme: themeDefault,
};

const ItineraryTripTitle = ({
  sourceName,
  destinationName,
  duration,
  type,
  direction,
  index,
}: Props) => (
  <TitleWrapper>
    <TripLabel tripIndex={index}>
      {type === "multicity" || type === "nomad" ? (
        <Stack align="center" spacing="tight">
          {sourceName}
          <FlightDirection />
          {destinationName}
        </Stack>
      ) : (
        direction && <Translate t={DIRECTION_TYPES[direction]} />
      )}
    </TripLabel>
    <TripTrime>
      <TranslateNode
        t="common.duration"
        values={{
          duration: <Time time={new Date(duration)} />,
        }}
      />
    </TripTrime>
  </TitleWrapper>
);

export default ItineraryTripTitle;
