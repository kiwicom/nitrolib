
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import AirplaneTakeoff from "@kiwicom/orbit-components/lib/icons/AirplaneTakeoff";
import AirplaneLanding from "@kiwicom/orbit-components/lib/icons/AirplaneLanding";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import StopoverArrow from "@kiwicom/orbit-components/lib/StopoverArrow";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../../../../../records/Theme";
import { Sector as SectorType } from "../../../../records/TravelArrangement";
import { ThemeProps } from "../../../../../../records/Theme";

type Props = {
  data: SectorType,
  direction: "takeOff" | "landing",
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
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
  margin-${/* sc-custom "right" */ right}: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
`;

RouteIcon.defaultProps = {
  theme: themeDefault,
};

const Sector = ({ data, direction }: Props) => {
  const { from, to, stops, note } = data;
  return (
    <Stack flex shrink direction="column">
      <Wrapper>
        <Stack inline shrink spacing="none">
          <RouteIcon>
            {direction === "takeOff" ? (
              <AirplaneTakeoff color="secondary" />
            ) : (
              <AirplaneLanding color="secondary" />
            )}
          </RouteIcon>
          <Stack inline shrink direction="column" spacing="tight">
            <Text>{from}</Text>
            <Stack direction="row" spacing="condensed" align="center">
              <StopoverArrow stops={stops} />
              <Text element="span" weight="bold" size="large">
                {to}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Wrapper>
      <Text size="small" type="secondary">
        {note}
      </Text>
    </Stack>
  );
};

export default Sector;
