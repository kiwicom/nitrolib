// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

const Month = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  display: flex;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  align-items: center;
  justify-content: center;
`;

Month.defaultProps = {
  theme: themeDefault,
};

export default Month;
