// @flow
import styled, { css } from "styled-components";

import { themeDefault } from "../../../../../records/Theme";
import type { ThemeProps } from "../../../../../records/Theme";

const TripInfoLine = styled.div`
  display: flex;
  line-height: normal;
  text-transform: capitalize;
  ${({ darker, theme }) =>
    darker ? `color: ${theme.orbit.paletteInkNormal}` : `color: ${theme.orbit["neutral-700"]}`};
  ${({ fontSize }) =>
    fontSize
      ? `font-size: ${fontSize}px`
      : css`
          font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
        `};
  ${({ margin }) => (margin ? `margin: ${margin}` : `margin: 2px 0`)};
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

export default TripInfoLine;
