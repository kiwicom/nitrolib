// @flow strict
import * as React from "react";
import styled from "styled-components";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";

import LanguageNameText from "./LanguageNameText";
import type { LangInfo } from "../../../records/LangInfo";
import { Consumer as InvertedConsumer } from "../../../services/inverted/context";

type Props = {|
  language: LangInfo,
|};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LanguageCurrent = ({ language }: Props) => (
  <InvertedConsumer>
    {({ inverted }) => (
      <Container>
        {/* $FlowExpected - their props are too specific */}
        <CountryFlag code={language.flag} />
        <LanguageNameText inverted={inverted}>{language.displayName}</LanguageNameText>
      </Container>
    )}
  </InvertedConsumer>
);

export default LanguageCurrent;
