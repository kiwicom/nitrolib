// @flow strict
import styled from "styled-components";
import PropTypes from "prop-types";

import type { ThemeProps } from "../../../../../records/Theme";
import { themeDefault } from "../../../../../records/Theme";

const ItemWrapper = styled.div`
  display: flex;
  ${({ x, y, direction }) => x && `justify-content: ${direction === "column" ? y : x}`};
  ${({ x, y, direction }) => y && `align-items: ${direction === "column" ? x : y}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  box-shadow: inset 0 -1px ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  }
`;

ItemWrapper.defaultProps = {
  theme: themeDefault,
};

// $FlowFixMe
ItemWrapper.propTypes = {
  direction: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string,
};

export default ItemWrapper;