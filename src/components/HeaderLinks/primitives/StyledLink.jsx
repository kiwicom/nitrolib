// @flow strict
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import { pseudoBorder } from "../../../styles/mixins/border";

type LinkProps = {|
  ...ThemeProps,
  active: boolean,
  inverted: boolean,
|};

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  position: relative;
  font-weight: ${({ theme }) => theme.orbit.fontWeightNormal};
  transition: text-shadow ${({ theme }: ThemeProps) => theme.orbit.durationFast};

  &:link,
  &:visited {
    color: ${({ theme, inverted }) =>
      inverted ? theme.orbit.paletteWhite : theme.orbit.paletteInkNormal};
    ${({ active, inverted }: LinkProps) =>
      active && !inverted && `text-shadow: 0 0 0.65px #333, 0 0 0.65px #333`};
  }

  &:hover {
    ${({ inverted }: LinkProps) => !inverted && `text-shadow: 0 0 0.65px #333, 0 0 0.65px #333`};
  }

  &:after {
    opacity: 0;
    content: "";
    transition: opacity ${({ theme }: ThemeProps) => theme.orbit.durationFast};
  }

  ${mq.desktop(css`
    &:hover {
      ${({ inverted }: LinkProps) => !inverted && pseudoBorder};
    }
  `)}
`;

StyledLink.defaultProps = {
  theme: themeDefault,
};

export default StyledLink;
