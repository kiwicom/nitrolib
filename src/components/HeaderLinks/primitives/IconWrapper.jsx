// @flow
import styled, { css } from "styled-components";

import { themeDefault } from "records/Theme";
import type { ThemeProps } from "records/Theme";
import mq from "styles/mediaQuery";

type ActiveProps = {|
  ...ThemeProps,
  active: boolean,
|};

const IconWrapper = styled.i`
  color: ${({ active, theme }: ActiveProps) =>
    active ? theme.orbit.paletteProductNormal : theme.orbit.paletteInkNormal};
  display: none;
  cursor: pointer;
  ${({ act }) =>
    act &&
    css`
      color: ${({ theme }) => theme.orbit.paletteProductNormal};
      svg:nth-child(2) {
        transform: rotate(180deg);
      }
    `};
  ${({ hover }) =>
    hover &&
    css`
      &:hover {
        color: ${({ theme }) => theme.orbit.paletteProductNormal};
      }
    `} ${mq.mobile(css`
    display: block;
  `)};
`;

IconWrapper.defaultProps = {
  theme: themeDefault,
};

export default IconWrapper;
