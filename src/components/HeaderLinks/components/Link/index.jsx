// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Trip from "@kiwicom/orbit-components/lib/icons/Trip";
import AirplaneUp from "@kiwicom/orbit-components/lib/icons/AirplaneUp";
import CarRental from "@kiwicom/orbit-components/lib/icons/CarRental";
import Accommodation from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Desktop from "@kiwicom/orbit-components/lib/Desktop";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";

import ButtonWrapper from "../../primitives/ButtonWrapper";

const mapIcons = {
  travel: <AirplaneUp />,
  cars: <CarRental />,
  rooms: <Accommodation />,
  holidays: <Suitcase />,
  logitravel: <Suitcase />,
  bedfinder: <Suitcase />,
  stories: <Trip />,
};

// These exist just to be collected
// eslint-disable-next-line no-unused-vars
const KEYS = {
  travel: __("search.service.travel_anywhere"),
  rooms: __("search.service.rooms"),
  cars: __("search.service.cars"),
  holidays: __("search.service.holidays"),
  stories: __("content.stories"),
};

const Icon = styled.div`
  ${mq.desktop(css`
    display: none;
  `)}
`;

type Props = {|
  link: string,
  icon: string,
  text: React.Node,
  newWindow: boolean,
  active?: boolean,
  newDesign?: boolean,
|};

const Link = ({ active, link, newWindow, icon, text, newDesign }: Props) => (
  <>
    <Desktop>
      <ButtonLink
        href={link}
        type={active ? "primary" : "secondary"}
        transparent
        external={!!newWindow}
      >
        {newDesign ? (
          <ButtonWrapper>
            <Stack flex align="center" spacing="natural">
              {icon && mapIcons[icon] && <Icon>{mapIcons[icon]}</Icon>}
              <div>{text}</div>
            </Stack>
          </ButtonWrapper>
        ) : (
          <Stack flex align="center" spacing="natural">
            {icon && mapIcons[icon] && <Icon>{mapIcons[icon]}</Icon>}
            <div>{text}</div>
          </Stack>
        )}
      </ButtonLink>
    </Desktop>
    <Mobile>
      <ButtonLink href={link} type={active ? "primary" : "secondary"} external={!!newWindow}>
        <Stack flex align="center" spacing="natural">
          {icon && mapIcons[icon] && <Icon>{mapIcons[icon]}</Icon>}
          <div>{text}</div>
        </Stack>
      </ButtonLink>
    </Mobile>
  </>
);

Link.defaultProps = {
  active: false,
  newWindow: false,
};

export default Link;
