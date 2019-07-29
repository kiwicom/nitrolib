import * as React from "react";
import styled from "styled-components";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { getNames } from "../../../records/Languages";
import { Language } from "../../../records/Languages";
import { themeDefault } from "../../../records/Theme";
import { ThemeProps } from "../../../records/Theme";

type Props = {
  language: Language,
};

const LanguageNameText = styled.span`
  margin-${/* sc-custom "left" */ left}: 10px;
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextSmall};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

LanguageNameText.defaultProps = {
  theme: themeDefault,
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LanguageNameTextThicc = styled(LanguageNameText)`
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightBold};
`;

LanguageNameTextThicc.defaultProps = {
  theme: themeDefault,
};

const LanguageNameTextLean = styled(LanguageNameText)`
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
`;

LanguageNameTextLean.defaultProps = {
  theme: themeDefault,
};

const LanguageName = ({ language }: Props) => {
  const { primary, secondary } = getNames(language);

  return (
    <Container>
      {/* $FlowExpected: their props are too specific */}
      <CountryFlag code={language.flag} name={`${primary} ${secondary}`} />
      <LanguageNameTextThicc>{primary}</LanguageNameTextThicc>
      <LanguageNameTextLean>{secondary}</LanguageNameTextLean>
    </Container>
  );
};

export default LanguageName;
