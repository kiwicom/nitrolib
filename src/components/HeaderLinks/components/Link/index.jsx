// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Trip from "@kiwicom/orbit-components/lib/icons/Trip";
import AirplaneUp from "@kiwicom/orbit-components/lib/icons/AirplaneUp";
import CarRental from "@kiwicom/orbit-components/lib/icons/CarRental";
import Accommodation from "@kiwicom/orbit-components/lib/icons/Accommodation";
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import IconWrapper from "../../primitives/IconWrapper";
import StyledLink from "../../primitives/StyledLink";

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
  inverted?: boolean,
|};

const Link = ({ active, link, newWindow, icon, text, inverted }: Props) => (
  <StyledLink
    active={active}
    href={link}
    inverted={inverted}
    target={newWindow ? "_blank" : null}
    rel={newWindow ? "noopener noreferrer" : null}
  >
    <Stack flex align="center">
      {icon && mapIcons[icon] && (
        <Icon>
          <IconWrapper>{mapIcons[icon]}</IconWrapper>
        </Icon>
      )}
      {text}
    </Stack>
  </StyledLink>
);

Link.defaultProps = {
  active: false,
  newWindow: false,
};

export default Link;
