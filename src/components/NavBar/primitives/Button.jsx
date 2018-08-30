// @flow
import styled from "styled-components";
import PropTypes from "prop-types";

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
  font-weight: 500;
  line-height: 50px;
  text-decoration: none;
  font-family: ${({ theme }: ThemeProps) => theme.orbit.fontFamily};
  ${({ transition }) => transition && `transition: color 0.2s ease-in-out`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px`};
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight}px`};
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
