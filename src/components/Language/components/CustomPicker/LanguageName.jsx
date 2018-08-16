// @flow strict
import * as React from "react";

import LanguageFlag from "../../LanguageFlag";
import type { LangInfo } from "../../../../records/LangInfo";
import type { Language } from "../../../../records/Languages";
import LanguageNameText from "./LanguageNameText";

type Props = {|
  language: Language | LangInfo,
|};

const LanguageName = ({ language }: Props) => (
  <>
    <LanguageFlag flagId={language.flag} scale={0.8} />
    <LanguageNameText>{language.name}</LanguageNameText>
  </>
);

export default LanguageName;
