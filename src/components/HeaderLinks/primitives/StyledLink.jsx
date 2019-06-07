// @flow strict
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type LinkProps = {|
  ...ThemeProps,
  active: boolean,
  inverted: boolean,
|};

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;

  &:link,
  &:visited {
    color: ${({ active, theme }: LinkProps) =>
      active ? theme.orbit.paletteProductNormal : theme.orbit.paletteInkNormal};
    i {
      color: ${({ theme }) => theme.orbit.paletteInkNormal};
    }

    &:hover {
      color: ${({ theme }: LinkProps) => theme.orbit.paletteProductNormal};
      i {
        color: ${({ theme }) => theme.orbit.paletteInkNormal};
      }
    }
  }

  ${mq.desktop(css`
    &:link,
    &:visited {
      color: ${({ active, theme, inverted }: LinkProps) =>
        inverted
          ? (active && theme.orbit.paletteWhiteActive) || theme.orbit.paletteWhite
          : (active && theme.orbit.paletteProductNormal) || theme.orbit.paletteInkNormal};

      &:hover {
        color: ${({ theme, inverted }: LinkProps) =>
          inverted ? theme.orbit.paletteWhiteHover : theme.orbit.paletteProductNormal};
      }
    }
  `)}
`;

StyledLink.defaultProps = {
  theme: themeDefault,
};

export default StyledLink;
