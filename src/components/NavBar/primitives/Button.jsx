// @flow
import styled from "styled-components";
import PropTypes from "prop-types";

import * as rtl from "../../../styles/rtl";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";
import buttonMixin from "../../../styles/mixins/button";

const Button = styled.button`
  ${buttonMixin};
  display: flex;
  ${({ theme, primary }) =>
    primary
      ? `color: ${theme.orbit.paletteProductNormal}`
      : `color: ${theme.orbit.paletteInkNormal}`};
  cursor: pointer;
  line-height: 50px;
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  line-height: 50px;
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

// $FlowFixMe
Button.propTypes = {
  padding: PropTypes.string,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  fontSize: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string,
  direction: PropTypes.string,
};

Button.defaultProps = {
  theme: themeDefault,
};

export default Button;
