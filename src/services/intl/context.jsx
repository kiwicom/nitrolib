// @flow strict
import * as React from "react";

import { intlDefault } from "../../records/Intl";
import translate from "./translate";
import type { Values } from "./translate";

const { Consumer, Provider } = React.createContext(intlDefault);

type Props = {|
  locale: string,
  translations: { [key: string]: string },
  children: React.Node,
|};

const IntlProvider = ({ locale, translations, children }: Props) => (
  <Provider
    value={{
      locale,
      translations,
      translate: (key: string, values: Values) => translate(translations, key, values),
    }}
  >
    {children}
  </Provider>
);

export { Consumer, IntlProvider as Provider };
