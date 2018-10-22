// @flow strict
import * as React from "react";

import IconWrapper from "./primitives/IconWrapper";
import StyledLink from "./primitives/StyledLink";

type Props = {
  link: string,
  icon: React.Node,
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
    <IconWrapper>{icon}</IconWrapper>
    {text}
  </StyledLink>
);

Link.defaultProps = {
  active: false,
  newWindow: false,
};

export default Link;
