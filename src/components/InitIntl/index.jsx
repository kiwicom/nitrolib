// @flow strict
import * as React from "react";

import type { Intl, IntlRaw } from "../../records/Intl";
import translate from "../../services/intl/translate";
import type { Values } from "../../services/intl/translate";

type Props = {|
  raw: IntlRaw,
  children: (arg: Intl) => React.Node,
|};

const InitIntl = ({ raw, children }: Props) =>
  children({
    language: raw.language,
    translations: raw.translations,
    translate: (key: string, values?: Values) => translate(raw.translations, key, values),
  });

export default InitIntl;
