// @flow strict
import styled, { css } from "styled-components";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type ActiveProps = {|
  ...ThemeProps,
  active: boolean,
  inverted?: boolean,
  act: boolean,
|};

const IconWrapper = styled.i`
  color: ${({ theme, inverted, act }: ActiveProps) =>
    inverted && (!act ? theme.orbit.paletteWhite : theme.orbit.paletteInkNormal)};
  display: block;
  cursor: pointer;
  padding-${/* sc-custom "right" */ right}: 10px;
  ${({ act }) =>
    act &&
    css`
      color: ${({ theme, inverted }: ActiveProps) =>
        inverted ? theme.orbit.paletteWhite : theme.orbit.paletteProductNormal};
      svg:nth-child(2) {
        transform: rotate(180deg);
      }
    `};
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

export default IconWrapper;
