// @flow strict
import * as React from "react";
import styled from "styled-components";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import Translate from "../../../Translate";

const Link = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  text-decoration: none;

  &:link,
  &:visited {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  }
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
    margin-${/* sc-custom "right" */ right}: 10px;
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
  translate?: string,
  link: string,
  onClick?: () => void,
|};

const MenuItem = ({ onClick, Icon, text, link, translate }: Props) => (
  <Container onClick={onClick}>
    {link !== "" ? (
      <Link href={link} itemProp="url">
        <Icon className="menuIcon" />
        <Item itemProp="name">{translate ? <Translate t={translate} /> : text}</Item>
      </Link>
    ) : (
      <Link>
        <Icon className="menuIcon" />
        <Item itemProp="name">{translate ? <Translate t={translate} /> : text}</Item>
      </Link>
    )}
  </Container>
);

MenuItem.defaultProps = {
  link: "",
};

export default MenuItem;
