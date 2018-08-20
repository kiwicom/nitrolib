// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../../records/Theme";

const LanguageNameText = styled.span`
  margin-left: 3px;
  font-size: 12px;
  font-weight: 500;
  line-height: 50px;
  color: ${({ theme }) => theme.orbit.paletteInkNormal};
  letter-spacing: 0.02em;
  font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
`;

LanguageNameText.defaultProps = {
  theme: themeDefault,
};

export default LanguageNameText;
