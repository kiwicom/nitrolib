// @flow strict

import * as React from "react";

export type Subcategory = "MagicLogin";
export type CuckooAction = "magicLinkSent" | "badLogin" | "abandoned";
export type CuckooError = "GraphQL network" | "GraphQL error";
export type CuckooProps = { [string]: mixed };

export type Context = {
  error: (errorType: CuckooError, error: Error, props: ?CuckooProps) => void,
  track: (subcategory: Subcategory, action: CuckooAction, props: ?CuckooProps) => void,
};

const context: React.Context<Context> = React.createContext({
  error: () => {},
  track: () => {},
});

export const { Consumer, Provider } = context;

export default context;
