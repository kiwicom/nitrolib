// @flow strict

import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import AirplaneTakeoff from "@kiwicom/orbit-components/lib/icons/AirplaneTakeoff";
import AirplaneLanding from "@kiwicom/orbit-components/lib/icons/AirplaneLanding";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import StopoverArrow from "@kiwicom/orbit-components/lib/StopoverArrow";

import { themeDefault } from "../../../../../../records/Theme";
import type { Sector as SectorType } from "../../../../records/TravelArrangement";
import type { ThemeProps } from "../../../../../../records/Theme";

type Props = {|
  data: SectorType,
  direction: "takeOff" | "landing",
|};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  padding-top: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  padding-right: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  padding-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceMedium};
  padding-left: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  background: ${({ theme }: ThemeProps) => theme.orbit.backgroundBody};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const RouteIcon = styled.div`
  margin-top: 5px;
  margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
`;

RouteIcon.defaultProps = {
  theme: themeDefault,
};

const Sector = ({ data, direction }: Props) => {
  const { from, to, stops, note } = data;
  return (
    <>
      <Wrapper>
        <RouteIcon>
          {direction === "takeOff" ? (
            <AirplaneTakeoff color="secondary" />
          ) : (
            <AirplaneLanding color="secondary" />
          )}
        </RouteIcon>
        <div>
          <Stack spaceAfter="smallest">
            <Text>{from}</Text>
          </Stack>
          <Stack direction="row" spacing="condensed" align="center">
            <StopoverArrow stops={stops} />
            <Text element="span" weight="bold" size="large">
              {to}
            </Text>
          </Stack>
        </div>
      </Wrapper>
      <Text size="small" type="secondary">
        {note}
      </Text>
    </>
  );
};

export default Sector;
