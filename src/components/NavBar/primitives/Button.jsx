// @flow
import styled from "styled-components";
import type { ReactComponentFunctional } from "styled-components";

import * as rtl from "../../../styles/rtl";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";
import buttonMixin from "../../../styles/mixins/button";

type Props = {|
  onClick: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  children: React.Node | React.Node[],
  bold?: boolean,
  primary?: boolean,
  padding?: string,
  marginLeft?: number,
  marginRight?: number,
  fontSize?: string,
  x?: string,
  y?: string,
  direction?: string,
|};

type PropsAll = {| ...ThemeProps, ...Props |};

const Button: ReactComponentFunctional<Props, ThemeProps> = styled.button`
  ${buttonMixin};
  display: flex;
  ${({ theme, primary }: PropsAll) =>
    primary
      ? `color: ${theme.orbit.paletteProductNormal}`
      : `color: ${theme.orbit.paletteInkNormal}`};
  cursor: pointer;
  line-height: 50px;
  font-weight: ${({ theme, bold }: PropsAll) =>
    bold ? theme.orbit.fontWeightBold : theme.orbit.fontWeightMedium};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-family: ${({ theme }: ThemeProps) => theme.orbit.fontFamily};
  text-decoration: none;
  ${({ transition }) => transition && `transition: color 0.2s ease-in-out`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ marginLeft, theme }) => marginLeft && `margin-${rtl.left({ theme })}: ${marginLeft}px`};
  ${({ marginRight, theme }) => marginRight && `margin-${rtl.right({ theme })}: ${marginRight}px`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
  ${({ x, y, direction }) => x && `justify-content: ${direction === "column" ? y : x}`};
  ${({ x, y, direction }) => y && `align-items: ${direction === "column" ? x : y}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};

  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductNormal};
  }
`;

Button.defaultProps = {
  theme: themeDefault,
};

export default Button;
