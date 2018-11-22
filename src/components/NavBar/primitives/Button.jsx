// @flow
import styled from "styled-components";
import type { ReactComponentFunctional } from "styled-components";
import * as React from "react";
import { left, right } from "@kiwicom/orbit-components/lib/utils/rtl";

import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";
import buttonMixin from "../../../styles/mixins/button";

export type Bg = "white" | "primary" | "secondary";
export type Color = "primary" | "secondary" | false;

type Props = {|
  onClick: (ev: SyntheticEvent<HTMLButtonElement>) => void,
  children: React.Node | React.Node[],
  bold?: boolean,
  onClick?: () => void,
  disabled?: boolean,
  color?: Color,
  background?: Bg,
  padding?: string,
  marginLeft?: number,
  marginRight?: number,
  children: React.Node,
  className?: string,
  fontSize?: string,
  x?: string,
  y?: string,
  direction?: string,
  dataTest?: string,
|};

type PropsAll = {| ...ThemeProps, ...Props |};

const Button: ReactComponentFunctional<Props, ThemeProps> = styled.button.attrs({
  "data-test": ({ dataTest }) => dataTest,
})`
  ${buttonMixin};
  display: flex;
  color: ${({ theme, color }: PropsAll) =>
    (color === "primary" && `${theme.orbit.paletteProductNormal}`) ||
    (color === "secondary" && `${theme.orbit.paletteInkNormal}`) ||
    theme.orbit.paletteWhite};
  cursor: pointer;
  font-weight: ${({ theme, bold }: PropsAll) =>
    bold ? theme.orbit.fontWeightBold : theme.orbit.fontWeightMedium};
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-family: ${({ theme }: ThemeProps) => theme.orbit.fontFamily};
  text-decoration: none;
  background: ${({ theme, background }: PropsAll) =>
    background
      ? (background === "white" && theme.orbit.paletteWhite) ||
        (background === "primary" && theme.orbit.backgroundButtonPrimary) ||
        (background === "secondary" && theme.orbit.backgroundButtonSecondary)
      : `transparent`};
  white-space: nowrap;
  ${({ transition }) => transition && `transition: color 0.2s ease-in-out`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ marginLeft, theme }) => marginLeft && `margin-${left({ theme })}: ${marginLeft}px`};
  ${({ marginRight, theme }) => marginRight && `margin-${right({ theme })}: ${marginRight}px`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
  ${({ x, y, direction }) => x && `justify-content: ${direction === "column" ? y : x}`};
  ${({ x, y, direction }) => y && `align-items: ${direction === "column" ? x : y}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};
  ${({ disabled }) => disabled && `opacity: 0.5`};
  &:visited,
  &:active,
  &:link {
    color: ${({ theme, color }: PropsAll) =>
      (color === "primary" && `${theme.orbit.paletteProductNormalActive}`) ||
      (color === "secondary" && `${theme.orbit.paletteInkNormalActive}`) ||
      theme.orbit.paletteWhiteActive};
  }

  &:hover {
    color: ${({ theme, color }: PropsAll) =>
      color === "primary" || color === "secondary"
        ? theme.orbit.paletteProductNormalHover
        : theme.orbit.paletteWhiteHover}
`;

Button.defaultProps = {
  theme: themeDefault,
};

export default Button;
