// @flow strict
import styled, { css } from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type ActiveProps = {|
  ...ThemeProps,
  active: boolean,
  act: boolean,
|};

const IconWrapper = styled.i`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ act }) =>
    act &&
    css`
      color: ${({ theme }: ActiveProps) => theme.orbit.paletteProductNormal};
      svg:nth-child(2) {
        transform: rotate(180deg);
      }
    `};
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

export default IconWrapper;
