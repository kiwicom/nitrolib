// @flow strict
import * as React from "react";
import * as R from "ramda";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";

import type { Language } from "../../records/Languages";
import type { LangInfo } from "../../records/LangInfo";
import NativeGroupedSelect from "../NativeGroupedSelect";

const mapLanguages = R.map(language => ({
  value: language.id,
  text: language.name,
}));

type Props = {|
  current: LangInfo,
  languages: Language[],
  favorite?: Language[],
  hideNativeText?: boolean,
  onChange: (value: string) => void,
|};

const NativePicker = ({ current, languages, favorite, hideNativeText, onChange }: Props) => (
  <NativeGroupedSelect
    value={current.id}
    groups={
      favorite
        ? [
            { key: "current", items: [{ value: current.id, text: current.name }] },
            { key: "favorite", items: mapLanguages(favorite) },
            { key: "all", items: mapLanguages(languages) },
          ]
        : [
            { key: "current", items: [{ value: current.id, text: current.name }] },
            { key: "all", items: mapLanguages(languages) },
          ]
    }
    // $FlowExpected: type too specific
    icon={<CountryFlag code={current.flag} />}
    hideNativeText={hideNativeText}
    onChange={onChange}
  />
);

export default NativePicker;
