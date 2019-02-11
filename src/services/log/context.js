// @flow strict
import * as React from "react";

import type { Event, Props } from "../../records/Event";

export type Context = {|
  log: (event: Event, props: Props) => void,
|};

const contextDefault: Context = {
  // Removed on purpose:
  // ev => console.log("%cNITROLOG", "color: green", ev), // eslint-disable-line no-console
  log: () => {},
};

const context: React.Context<Context> = React.createContext(contextDefault);

export const { Consumer, Provider } = context;

export default context;
