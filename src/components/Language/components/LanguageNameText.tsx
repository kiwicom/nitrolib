import styled from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type InvertedColor = {
  ...ThemeProps,
  active: boolean,
  inverted: boolean,
};

const LanguageNameText = styled.span`
  margin-${/* sc-custom "left" */ left}: 10px;
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
