// @flow strict
import * as React from "react";
import styled from "styled-components";

import type { Language } from "../../records/Languages";
import type { LangInfo } from "../../records/LangInfo";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import LanguageNameText from "./LanguageNameText";
import config from "../../consts/config";

const NativeSelect = styled.select`
  display: flex;
  flex-direction: row;
  align-items: center;
  appearance: none;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  outline: 0;
  margin-left: 2px;
  font-size: 12px;
  font-weight: 500;
  font-family: "Helvetica Neue", "Calibri Light", Roboto, sans-serif;
  letter-spacing: 0.02em;
  -webkit-font-smoothing: antialiased;
  &:hover {
    ${LanguageNameText} {
      color: ${({ theme }: ThemeProps) => theme.orbit.paletteProductDark};
    }
  }
`;

NativeSelect.defaultProps = {
  theme: themeDefault,
};

const Icon = styled.i`
  background: ${({ flagId }: { flagId: string }) =>
    `url("${config.imagesUrl}flags/32x32/${flagId}.png")`};
  align-items: center;
  height: 32px;
  width: 32px;
  transform: scale(0.7);
`;

type Props = {|
  current: LangInfo,
  languages: Language[],
  onChange: (value: string) => void,
|};

const MobileSelect = ({ current, languages, onChange }: Props) => (
  <>
    <Icon flagId={current.flag} />
    <NativeSelect value={current.id} onChange={onChange}>
      {languages.map(language => (
        <option key={language.id} value={language.id}>
          {language.name}
        </option>
      ))}
    </NativeSelect>
  </>
);

export default MobileSelect;
