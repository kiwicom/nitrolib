// @flow strict

import * as React from "react";
import styled, { css } from "styled-components";
import CalendarIcon from "@kiwicom/orbit-components/lib/icons/Calendar";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Separator from "@kiwicom/orbit-components/lib/Separator";
import Hide from "@kiwicom/orbit-components/lib/Hide";

import SectionHeading from "./components/SectionHeading";
import TravelDates from "./components/TravelDates";
import TravelArrangement from "./components/TravelArrangement";
import Passengers from "./components/Passengers";
import { themeDefault } from "../../records/Theme";
import type { TravelArrangement as TravelArrangementType } from "./records/TravelArrangement";
import type { TravelDates as TravelDatesType } from "./records/TravelDates";
import type { Passengers as PassengersType } from "../../records/TravelInfo";
import type { ThemeProps } from "../../records/Theme";

export type Props = {
  travelArrangement: TravelArrangementType,
  travelDates: TravelDatesType,
  passengers: PassengersType,
};

const Wrapper = styled.div`
  margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceMedium};
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge}
    ${({ theme }) => theme.orbit.spaceSmall};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  border-width: ${({ theme }: ThemeProps) => theme.orbit.borderWidthCard};
  border-style: ${({ theme }: ThemeProps) => theme.orbit.borderStyleCard};
  border-color: ${({ theme }: ThemeProps) => theme.orbit.borderColorCard};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  box-shadow: ${({ theme }: ThemeProps) => theme.orbit.boxShadowElevatedLevel1};

  ${mq.largeMobile(css`
    padding: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const TravelDatesWrapper = styled.div`
  margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  ${mq.largeMobile(css`
    margin-bottom: 0;
  `)};
`;

TravelDatesWrapper.defaultProps = {
  theme: themeDefault,
};

const TravelInfo = ({ travelArrangement, travelDates, passengers }: Props) => (
  <Wrapper>
    <SectionHeading icon={<CalendarIcon />} t="holidays.travel_info.title" />
    <TravelArrangement data={travelArrangement} />

    <Hide on={["largeMobile"]} block>
      <Separator />
    </Hide>
    <Stack flex direction="column" spacing="comfy" largeMobile={{ direction: "row" }}>
      <Stack>
        <TravelDatesWrapper>
          <TravelDates data={travelDates} />
        </TravelDatesWrapper>
        <Hide on={["largeMobile"]} block>
          <Separator />
        </Hide>
      </Stack>
      <Stack>
        <Passengers {...passengers} />
      </Stack>
    </Stack>
  </Wrapper>
);

export default TravelInfo;
