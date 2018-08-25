// @flow strict
import * as React from "react";
import styled from "styled-components";

import { themeDefault } from "../../../../../../records/Theme";
import type { ThemeProps } from "../../../../../../records/Theme";

const Link = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  text-decoration: none;
`;

Link.defaultProps = {
  theme: themeDefault,
};

const Container = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  margin-top: 10px;
  cursor: pointer;

  .menuIcon {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }

  &:hover {
    ${Link} {
      color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
    }

    .menuIcon {
      color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
    }
  }
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Item = styled.span`
  line-height: 20px;
`;

type Props = {|
  Icon: React.ComponentType<$Subtype<{ +className?: string }>>,
  text: React.Node,
  link: string,
  onClick?: () => void,
|};

const MenuItem = ({ onClick, Icon, text, link }: Props) => (
  <Container onClick={onClick}>
    {link !== "" ? (
      <Link link={link} itemProp="url">
        <Icon className="menuIcon" />
        <Item itemProp="name">{text}</Item>
      </Link>
    ) : (
      <Link>
        <Icon className="menuIcon" />
        <Item itemProp="name">{text}</Item>
      </Link>
    )}
  </Container>
);

MenuItem.defaultProps = {
  link: "",
};

export default MenuItem;
