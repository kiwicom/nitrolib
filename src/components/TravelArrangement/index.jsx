// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import Translate from "../Translate";
import Sector from "./components/Sector";
import { themeDefault } from "../../records/Theme";
import type { TravelArrangement as TravelArrangementType } from "../../records/TravelArrangement";
import type { ThemeProps } from "../../records/Theme";

type Props = {|
  data: TravelArrangementType,
|};

const SectorWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  :first-child {
    margin-bottom: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
  }

  ${mq.largeMobile(css`
    :first-child {
      margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceLarge};
      margin-bottom: 0;
    }
  `)};
`;
SectorWrapper.defaultProps = {
  theme: themeDefault,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${mq.largeMobile(css`
    flex-direction: row;
  `)};
`;

const TravelArrangement = ({ data }: Props) => {
  const { takeOff, landing } = data;

  return (
    <Stack spaceAfter="large">
      <Heading element="h4" type="title3" spaceAfter="small">
        <Translate t="holidays.detail.travel_arrangement" />
      </Heading>
      <Wrapper>
        <SectorWrapper key="1">
          <Sector data={takeOff} direction="takeOff" />
        </SectorWrapper>
        <SectorWrapper key="2">
          <Sector data={landing} direction="landing" />
        </SectorWrapper>
      </Wrapper>
    </Stack>
  );
};

export default TravelArrangement;
