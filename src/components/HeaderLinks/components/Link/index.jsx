// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import {
  AirplaneUp,
  CarRental,
  Accommodation,
  Suitcase,
} from "@kiwicom/orbit-components/lib/icons";

import mq from "../../../../styles/mq";
import IconWrapper from "../../primitives/IconWrapper";
import StyledLink from "../../primitives/StyledLink";

const mapIcons = {
  travel: <AirplaneUp />,
  cars: <CarRental />,
  rooms: <Accommodation />,
  holidays: <Suitcase />,
  logitravel: <Suitcase />,
};

const Icon = styled.div`
  ${mq.gtTablet(css`
    display: none;
  `)}
`;

type Props = {
  link: string,
  icon: string,
  text: React.Node,
  inverted?: boolean,
  active: boolean,
  newWindow: boolean,
};

const Link = ({ active, link, newWindow, icon, text, inverted }: Props) => (
  <StyledLink
    active={active}
    href={link}
    inverted={inverted}
    target={newWindow ? "_blank" : null}
    rel={newWindow ? "noopener noreferrer" : null}
  >
    {icon && mapIcons[icon] && (
      <Icon>
        <IconWrapper>{mapIcons[icon]}</IconWrapper>
      </Icon>
    )}
    {text}
  </StyledLink>
);

Link.defaultProps = {
  active: false,
  newWindow: false,
};

export default Link;
