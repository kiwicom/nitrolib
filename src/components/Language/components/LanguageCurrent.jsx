// @flow strict
import * as React from "react";
import styled from "styled-components";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";

import LanguageNameText from "./LanguageNameText";
import type { LangInfo } from "../../../records/LangInfo";

type Props = {|
  language: LangInfo,
  inverted?: boolean,
|};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LanguageCurrent = ({ language, inverted }: Props) => (
  <Container>
    {/* $FlowExpected: their props are too specific */}
    <CountryFlag code={language.flag} name={language.displayName} />
    <LanguageNameText inverted={inverted}>{language.displayName}</LanguageNameText>
  </Container>
);

export default LanguageCurrent;
