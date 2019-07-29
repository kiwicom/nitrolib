import styled from "styled-components";
import { ReactComponentFunctional } from "styled-components";
import * as React from "react";

import { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";
import buttonMixin from "../../../styles/mixins/button";

export type Bg = "white" | "primary" | "secondary";
export type Color = "primary" | "secondary" | "warning" | "white";
export type FontSize = {
  ...ThemeProps,
  fontSize: number,
};

type Props = {
  bold?: boolean,
  children: React.ReactNode | React.ReactNode[],
  onClick?: () => void,
  disabled?: boolean,
  color?: Color,
  background?: Bg,
  className?: string,
  fontSize?: number,
};

type PropsAll = { ...ThemeProps, ...Props };

const Button: ReactComponentFunctional<Props, ThemeProps> = styled.button`
  ${buttonMixin};
  display: flex;
  align-items: center;
  color: ${({ theme, color }: PropsAll) =>
    (color === "primary" && `${theme.orbit.paletteProductNormal}`) ||
    (color === "warning" && `${theme.orbit.paletteRedNormal}`) ||
    (color === "white" && `${theme.orbit.paletteWhite}`) ||
    (color === "secondary" && `${theme.orbit.paletteInkNormal}`) ||
    theme.orbit.paletteInkNormal};
  cursor: pointer;
  font-weight: ${({ theme, bold }: PropsAll) =>
    bold ? theme.orbit.fontWeightBold : theme.orbit.fontWeightMedium};
  font-family: ${({ theme }: ThemeProps) => theme.orbit.fontFamily};
  text-decoration: none;
  background: ${({ theme, background }: PropsAll) =>
    background
      ? (background === "white" && theme.orbit.paletteWhite) ||
        (background === "primary" && theme.orbit.backgroundButtonPrimary) ||
        (background === "secondary" && theme.orbit.backgroundButtonSecondary)
      : `transparent`};
  white-space: nowrap;
  width: auto;
  ${({ transition }) => transition && `transition: color 0.2s ease-in-out`};
  font-size: ${({ fontSize, theme }: FontSize) =>
    fontSize ? `${fontSize}px` : `${theme.orbit.fontSizeTextSmall}`};
  ${({ disabled }) => disabled && `opacity: 0.5`};
  &:visited,
  &:active {
    color: ${({ theme, color }: PropsAll) =>
      (color === "primary" && `${theme.orbit.paletteProductNormalActive}`) ||
      (color === "warning" && `${theme.orbit.paletteRedNormalActive}`) ||
      (color === "white" && `${theme.orbit.paletteWhiteActive}`) ||
      theme.orbit.paletteProductNormalActive};
  }

  &:hover {
    color: ${({ theme, color }: PropsAll) =>
      (color === "primary" && `${theme.orbit.paletteProductNormalHover}`) ||
      (color === "warning" && `${theme.orbit.paletteRedNormalHover}`) ||
      (color === "white" && `${theme.orbit.paletteWhiteHover}`) ||
      theme.orbit.paletteProductNormalHover};
  }
`;

Button.defaultProps = {
  theme: themeDefault,
};

export default Button;
