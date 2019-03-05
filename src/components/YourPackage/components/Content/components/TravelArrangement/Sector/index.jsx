// @flow strict

import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import AirplaneTakeoff from "@kiwicom/orbit-components/lib/icons/AirplaneTakeoff";
import AirplaneLanding from "@kiwicom/orbit-components/lib/icons/AirplaneLanding";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import StopoverArrow from "@kiwicom/orbit-components/lib/StopoverArrow";

import { themeDefault } from "../../../../../../../records/Theme";

export type SectorType = $ReadOnlyArray<{|
  departure: string,
  destination: string,
  numberOfStops: ?number,
  note: string,
|}>;

type Props = {|
  data: SectorType,
  direction: "takeOff" | "landing",
|};

function getStops(numberOfStops: ?number): "0" | "1" | "2" | "3" {
  switch (numberOfStops) {
    case 1: {
      return "1";
    }
    case 2: {
      return "2";
    }
    case 3: {
      return "3";
    }
    default: {
      if (!!numberOfStops && numberOfStops > 3) {
        return "3";
      }
      return "0";
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RouteIcon = styled.div`
  margin-top: 5px;
  margin-right: ${({ theme }) => theme.orbit.spaceLarge};
`;

RouteIcon.defaultProps = {
  theme: themeDefault,
};

const Sector = ({ data, direction }: Props) => {
  const { departure, numberOfStops, note } = data[0];
  const { destination } = data[data.length - 1];

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
          <Stack direction="row" spacing="condensed" align="center">
            <Text element="span" size="large">
              {departure}
            </Text>
            <StopoverArrow stops={getStops(numberOfStops)} />
            <Text element="span" size="large">
              {destination}
            </Text>
          </Stack>
          <Stack direction="row" spacing="condensed" align="center">
            <Text type="secondary" element="span" weight="normal" size="small">
              {note}
            </Text>
          </Stack>
        </div>
      </Wrapper>
    </>
  );
};

export default Sector;
