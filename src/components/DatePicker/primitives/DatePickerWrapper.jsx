// @flow strict
import styled, { css } from "styled-components";
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

const DatePickerWrapper = styled.div`
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  z-index: 2;
  width: 100%;
  margin-top: 10px;
  position: absolute;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.5);
  ${media.largeMobile(css`
    width: 400px;
  `)}
`;

DatePickerWrapper.defaultProps = {
  theme: themeDefault,
};

export default DatePickerWrapper;
