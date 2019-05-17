// @flow strict

import * as React from "react";
import styled from "styled-components";
import PassengersIcon from "@kiwicom/orbit-components/lib/icons/Passengers";
import Text from "@kiwicom/orbit-components/lib/Text";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import type { Passengers as PassengersType } from "../../../../records/TravelInfo";
import type { ThemeProps } from "../../../../records/Theme";

const Wrapper = styled.div`
  display: flex;
`;

const StyledPassengersIcon = styled(PassengersIcon)`
  margin-${/* sc-custom "right" */ right}: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
`;

StyledPassengersIcon.defaultProps = {
  theme: themeDefault,
};

const Passengers = ({ adults, children }: PassengersType) => (
  <>
    <Heading element="h4" type="title3" spaceAfter="small">
      <Translate t="holidays.travel_info.passengers" />
    </Heading>
    <Wrapper>
      <StyledPassengersIcon color="primary" />
      <Text>
        <Translate t="holidays.travel_info.x_adults" values={{ num: adults }} />
        <br />
        <Translate t="holidays.travel_info.x_child" values={{ num: children }} />
      </Text>
    </Wrapper>
  </>
);

export default Passengers;
