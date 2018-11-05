// @flow strict
import * as React from "react";

import type { Event } from "../../records/Event";

export type Context<E, D> = {|
  log: (event: Event<E, D>) => void,
|};

// FIXME find a way to make Flow infer types based on usage if possible
const contextDefault: Context<any, any> = {
  log: ev => console.log("%cNITROLOG", "color: green", ev), // eslint-disable-line no-console
};

const context: React.Context<Context<any, any>> = React.createContext(contextDefault);

export const { Provider, Consumer } = context;
