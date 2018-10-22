// @flow strict
import styled from "styled-components";

import * as rtl from "../../../styles/rtl";
import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type InvertedColor = ThemeProps & {|
  inverted: boolean,
|};

const LanguageNameText = styled.span`
  margin-${rtl.left}: 10px;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: ${({ theme, inverted }: InvertedColor) =>
    inverted ? theme.orbit.paletteWhite : theme.orbit.paletteInkNormal};
  &:hover {
    color: ${({ theme, inverted }: InvertedColor) =>
      inverted ? theme.orbit.paletteWhiteHover : theme.orbit.paletteProductNormalHover};
  }
`;

LanguageNameText.defaultProps = {
  theme: themeDefault,
};

export default LanguageNameText;
