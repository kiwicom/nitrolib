// @flow strict
import * as React from "react";
import styled from "styled-components";

import type { Language } from "../../records/Languages";
import config from "../../consts/config";
import LanguageNameText from "./LanguageNameText";

type Props = {|
  language: Language,
|};

const Icon = styled.i`
  background: ${({ flagId }: { flagId: string }) =>
    `url("${config.imagesUrl}flags/32x32/${flagId}.png")`};
  height: 32px;
  width: 32px;
  display: block;
  transform: scale(0.7);
`;

const LanguageName = ({ language }: Props) => (
  <>
    <Icon flagId={language.flag} />
    <LanguageNameText>{language.name}</LanguageNameText>
  </>
);

export default LanguageName;
