// @flow strict
import * as React from "react";
import styled from "styled-components";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";

import LanguageNameText from "./LanguageNameText";

type Props = {|
  flag: string,
  name: string,
|};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LanguageName = ({ flag, name }: Props) => (
  <Container>
    {/* $FlowExpected - their props are too specific */}
    <CountryFlag code={flag} />
    <LanguageNameText>{name}</LanguageNameText>
  </Container>
);

export default LanguageName;
