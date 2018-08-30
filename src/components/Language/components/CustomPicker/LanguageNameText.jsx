// @flow strict
import styled from "styled-components";

import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";

const LanguageNameText = styled.span`
  margin-left: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};
  letter-spacing: 0.02em;
`;

LanguageNameText.defaultProps = {
  theme: themeDefault,
};

export default LanguageNameText;
