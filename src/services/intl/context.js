// @flow strict
import * as React from "react";

import { intlDefault } from "../../records/Intl";
import type { Intl } from "../../records/Intl";

export type Context = {|
  ...Intl,
  onDebug: () => void,
|};

const context: React.Context<Context> = React.createContext({
  ...intlDefault,
  onDebug: () => {},
});

export const { Consumer, Provider } = context;

export default context;
