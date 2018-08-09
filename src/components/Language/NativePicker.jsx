// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import NativeGroupedSelect from "../NativeGroupedSelect";
import type { Language } from "../../records/Languages";
import type { LangInfo } from "../../records/LangInfo";
import LanguageFlag from "./LanguageFlag";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const mapLanguages = R.map(language => ({
  value: language.id,
  text: language.name,
}));

type Props = {|
  current: LangInfo,
  languages: Language[],
  onChange: (value: string) => void,
|};

const NativePicker = ({ current, languages, onChange }: Props) => (
  <Container>
    <NativeGroupedSelect
      value={current.id}
      groups={[
        { key: "current", items: mapLanguages([current]) },
        { key: "all", items: mapLanguages(languages) },
      ]}
      icon={<LanguageFlag flagId={current.flag} scale={0.5} />}
      onChange={onChange}
    />
  </Container>
);

export default NativePicker;
