// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

const Month = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  display: ${({ shown }) => (shown ? `flex` : `none`)};
  font-size: ${({ theme }) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }) => theme.orbit.fontWeightMedium};
  align-items: center;
  justify-content: center;
`;

Month.defaultProps = {
  theme: themeDefault,
};

export default Month;
