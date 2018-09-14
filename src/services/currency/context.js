// @flow
import * as React from "react";

import type { Currencies, Currency } from "../../records/Currency";
import { currencyDefault } from "../../records/Currency";

type Context = {|
  currency: Currency,
  loading: boolean,
  available: Currencies,
  recommended: Currency[],
  onChange: (code: string) => void,
|};

const contextDefault: Context = {
  currency: currencyDefault,
  loading: false,
  available: {},
  recommended: [],
  onChange: () => {},
};

export const { Consumer, Provider } = React.createContext(contextDefault);
