import styled, { css } from "styled-components";
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../records/Theme";
import { ThemeProps } from "../../../records/Theme";

type ActiveProps = ThemeProps & { active: boolean };

const DatePickerWrapper = styled.div`
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  z-index: 2;
  width: 100%;
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  margin-top: 10px;
  border-radius: 4px;
  position: absolute;
  ${({ active }: ActiveProps) => active && `box-shadow: 0 20px 60px 0 rgba(23, 27, 30, 0.4)`};
  ${media.largeMobile(css`
    width: 400px;
  `)}
`;

DatePickerWrapper.defaultProps = {
  theme: themeDefault,
};

export default DatePickerWrapper;
