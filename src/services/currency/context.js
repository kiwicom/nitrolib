// @flow
import * as React from "react";

import type { Currencies, Currency } from "../../records/Currency";
import { currencyDefault } from "../../records/Currency";

export type Context = {|
  currency: Currency,
  available: Currencies,
  recommended: Currency[],
  onChange: (code: string) => void,
|};

const contextDefault: Context = {
  currency: currencyDefault,
  available: {},
  recommended: [],
  onChange: () => {},
};

const context: React.Context<Context> = React.createContext(contextDefault);

export const { Consumer, Provider } = context;
