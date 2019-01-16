// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

const Month = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  display: ${({ shown }) => (shown ? `flex` : `none`)};
  font-size: ${({ theme }) => theme.orbit.fontSizeHeadingTitle2};
  font-weight: ${({ theme }) => theme.orbit.fontWeightBold};
  align-items: center;
  justify-content: center;
`;

Month.defaultProps = {
  theme: themeDefault,
};

export default Month;
