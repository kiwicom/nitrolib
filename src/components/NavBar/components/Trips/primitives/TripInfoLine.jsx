// @flow
import styled from "styled-components";
import PropTypes from "prop-types";

import { themeDefault } from "../../../../../records/Theme";

const TripInfoLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  line-height: normal;
  ${({ darker, theme }) =>
    darker ? `color: ${theme.orbit.paletteInkNormal}` : `color: ${theme.orbit["neutral-700"]}`};
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize}px` : `font-size: 14px`)};
  ${({ margin }) => (margin ? `margin: ${margin}` : `margin: 2px 0`)};
  max-width: 100%;
  span {
    height: 18px;
    line-height: 18px;
  }
  svg {
    height: 20px;
  }
`;

TripInfoLine.defaultProps = {
  theme: themeDefault,
};

// $FlowFixMe
TripInfoLine.propTypes = {
  margin: PropTypes.string,
  darker: PropTypes.bool,
  fontSize: PropTypes.string,
};

export default TripInfoLine;
