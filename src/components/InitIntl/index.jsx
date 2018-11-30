// @flow strict
import * as React from "react";
import enUS from "date-fns/locale/en-US"; // fallback

import type { Intl, IntlRaw } from "../../records/Intl";
import translate from "../../services/intl/translate";
import type { Values } from "../../services/intl/translate";

type Props = {|
  raw: IntlRaw,
  children: (arg: Intl) => React.Node,
  // defaulted
  getLocale: () => Promise<$FlowFixMe>,
|};

const InitIntl = ({ raw, getLocale, children }: Props) =>
  children({
    language: raw.language,
    translations: raw.translations,
    translate: (key: string, values?: Values) => translate(raw.translations, key, values),
    getLocale,
  });

InitIntl.defaultProps = {
  getLocale: () => Promise.resolve(enUS),
};

export default InitIntl;
