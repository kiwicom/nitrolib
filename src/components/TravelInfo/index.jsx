// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import CalendarIcon from "@kiwicom/orbit-components/lib/icons/Calendar";

import SectionHeading from "../SectionHeading";
import TravelDates from "../TravelDates";
import TravelArrangement from "../TravelArrangement";
import Passengers from "./components/Passengers";
import mq from "../../styles/mq";
import { themeDefault } from "../../records/Theme";
import type { TravelArrangement as TravelArrangementType } from "../../records/TravelArrangement";
import type { TravelDates as TravelDatesType } from "../../records/TravelDates";
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

  ${mq.gtBigMobile(css`
    padding: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

// Used custom `Separator` instead of orbit’s one
// because of the responsivity
const Separator = styled.div`
  ${mq.gtBigMobile(css`
    margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
    border-bottom-width: ${({ theme }: ThemeProps) => theme.orbit.heightSeparator};
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }: ThemeProps) => theme.orbit.backgroundSeparator};
  `)};
`;

Separator.defaultProps = {
  theme: themeDefault,
};

const Row = styled.div`
  ${mq.gtBigMobile(css`
    display: flex;
  `)};
`;

const Column = styled.div`
  flex-grow: 1;
  flex-basis: 0;

  :first-child {
    margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  }
`;

Column.defaultProps = {
  theme: themeDefault,
};

const TravelDatesWrapper = styled.div`
  ${mq.gtBigMobile(css`
    margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  `)};
`;

TravelDatesWrapper.defaultProps = {
  theme: themeDefault,
};

const TravelInfo = ({ travelArrangement, travelDates, passengers }: Props) => (
  <Wrapper>
    <SectionHeading icon={<CalendarIcon />} t="holidays.travel_info.title" />
    <TravelArrangement data={travelArrangement} />
    <Separator />
    <Row>
      <Column>
        <TravelDatesWrapper>
          <TravelDates data={travelDates} />
        </TravelDatesWrapper>
        <Separator />
      </Column>
      <Column>
        <Passengers {...passengers} />
      </Column>
    </Row>
  </Wrapper>
);

export default TravelInfo;
