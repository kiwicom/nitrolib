// @flow strict
import * as React from "react";
import styled from "styled-components";

import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";

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
  cursor: pointer;
`;

Container.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  text: React.Node,
  link: string,
  onClick?: () => void,
|};

const MenuItem = ({ onClick, text, link }: Props) => (
  <Container onClick={onClick}>
    {link !== "" ? (
      <Link href={link} itemProp="url">
        {text}
      </Link>
    ) : (
      <Link>{text}</Link>
    )}
  </Container>
);

MenuItem.defaultProps = {
  link: "",
};

export default MenuItem;
