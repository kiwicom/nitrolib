// @flow strict
import * as React from "react";
import styled from "styled-components";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";

import { getNames } from "../../../records/Languages";
import type { Language } from "../../../records/Languages";
import LanguageNameText from "./LanguageNameText";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type Props = {|
  language: Language,
|};

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
      {/* $FlowExpected - their props are too specific */}
      <CountryFlag code={language.flag} />
      <LanguageNameTextThicc>{primary}</LanguageNameTextThicc>
      <LanguageNameTextLean>{secondary}</LanguageNameTextLean>
    </Container>
  );
};

export default LanguageName;
