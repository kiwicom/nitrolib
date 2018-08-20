// @flow strict
import * as React from "react";

import { intlDefault } from "../../records/Intl";
import type { LangInfo } from "../../records/LangInfo";
import translate from "./translate";
import type { Values } from "./translate";

const { Consumer, Provider } = React.createContext(intlDefault);

type Props = {|
  language: LangInfo,
  translations: { [key: string]: string },
  children: React.Node,
|};

const IntlProvider = ({ language, translations, children }: Props) => (
  <Provider
    value={{
      language,
      translations,
      translate: (key: string, values?: Values) => translate(translations, key, values),
    }}
  >
    {children}
  </Provider>
);

export { Consumer, IntlProvider as Provider };
